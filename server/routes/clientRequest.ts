import  { IncomingMessage, ServerResponse } from 'http';

export const handleRequest = function(req: IncomingMessage, res: ServerResponse, data: any) {
  const { headers, method, url }  = req;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  const responseBody = {headers, method, url, data};

  res.write(JSON.stringify(responseBody));
  res.end();
  return;
};
