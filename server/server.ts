import http from 'http';
import url from 'url';

const PORT = 3000;

import { handleRequest } from './routes/clientRequest';
import { newModelData, Query } from './routes/newModelData';
import DataModel from './dataModel';

export interface QueryObjectDogTypes {
  data: string;
}

export type DogAPIResponse = {
  [key: string]: string | number | Array<string> | QueryObjectDogTypes | Buffer;
}

const dataModel = new DataModel();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = http.createServer(async (req, res) => {
  const parts = url.parse(req.url, true);
  const query: Query = parts.query;

  let result: DogAPIResponse | string;
  let body: Array<DogAPIResponse>;

  if (query) {
    const pagedResults = await newModelData(dataModel, query);
    result = pagedResults;
  }

  req.on('error', err => {
    console.warn(err);
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .on('data', (chunck: Buffer) => {
    const body = [];
    body.push(chunck);
  })
  .on('end', () => {
    let data: string | DogAPIResponse;
    
    if (result !== undefined) {
      data = result;
    } else {
      data = body.toString();
    }

    handleRequest(req, res, data);
  });

})
.listen(PORT);

console.log(`server running on ${PORT}`);
