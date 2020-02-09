import http from 'http';
import url from 'url';

const PORT = 3000;

import { handleRequest } from './routes/clientRequest';
import { newModelData, Query } from './routes/newModelData';
import DataModel from './dataModel';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = http.createServer(async (req, res) => {
  console.log(typeof req);
  const parts = url.parse(req.url, true);
  const query: Query = parts.query;

  const dataModel = new DataModel();

  if (query) {
    const result = await newModelData(dataModel, query);
    console.log(result, '<<<<<');
  }

  req.on('error', err => {
    console.warn(err);
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .on('data', (chunck: any) => {
    console.log('BODY');
    const body = [];
    console.log(chunck.toString());
    body.push(chunck);
  })
  .on('end', () => {
    console.log('END');
    handleRequest(req, res, dataModel);
  });

})
.listen(PORT);

console.log(`server running on ${PORT}`);
