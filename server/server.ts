import http from 'http';
import url from 'url';

const PORT = 3000;

import { handleRequest } from './routes/clientRequest';
import { newModelData, Query } from './routes/newModelData';
import DataModel from './dataModel';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = http.createServer(async (req, res) => {
  const parts = url.parse(req.url, true);
  const query: Query = parts.query;

  const dataModel = new DataModel();
  let result: string;
  let body: Array<any>;

  if (query) {
    const pagedResults = await newModelData(dataModel, query);
    result = JSON.stringify(pagedResults);
  }

  req.on('error', err => {
    console.warn(err);
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .on('data', (chunck: any) => {
    const body = [];
    body.push(chunck);
  })
  .on('end', () => {
    let data: string;
    
    if (result !== undefined) {
      console.log('result', result);
      data = result;
    } else {
      data = body.toString();
    }

    handleRequest(req, res, data);
  });

})
.listen(PORT);

console.log(`server running on ${PORT}`);
