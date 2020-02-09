import http from 'http';
import url from 'url';

const PORT = 3000;

import { handleRequest } from './routes/all';
import DataModel from './dataModel';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = http.createServer((req, res) => {
  const parts = url.parse(req.url, true);

  const dataModel = new DataModel();
  // console.log(parts.query);

  const { type } = parts.query;

  // If user passes in a new type
  if ( type && type !== dataModel.currentType) {
    console.log(`TYPE ${type}`);
    dataModel.updateType(type);
  } else {
    console.log('NO TYPE');
  }


  req.on('error', err => {

  })
  .on('data', (chunck: any) => {
    const body = [];
    const postData = '{"login":"toto","password":"okay","duration":"9999"}';
    body.push(postData);
  })
  .on('end', () => {
    handleRequest(req, res);
  });

})
.listen(PORT);
