import  { IncomingMessage, ServerResponse } from 'http';
import https from 'https';
import DataModel from '../dataModel';

export interface Query {
  type?: string;
  list?: string;
  page?: number;
}

const API_BASE_URL = 'dog.ceo';
const API_BASE_PATH = '/api';

export const newModelData = async function (dataModel: DataModel, query: Query) {
  return new Promise((resolve, reject) => {
    const { list, page, type } = query;
    const isList = list === 'true' ? true : false;

    let path: string;
    let body = '';
  
    // build path
    // /breeds/list/all
    // /breed/{type}/images
    // /breed/{type}/list

    if (page && (!type || (type && type === dataModel.currentType))) {
      // don't update data, just return new page
      console.log('update page');
      resolve(dataModel.updatePage(page));
    }
  
    if ( !type ) {
      path = `${API_BASE_PATH}/breeds/list/all`;
    } else {
      path = `${API_BASE_PATH}/breed/${type}/${ isList ? 'list' : 'images' }`;
    }
  
    const options = {
      hostname: API_BASE_URL,
      path,
      method: 'GET'
    };
  
    const req = https.request(options, async (req) => {
      console.log(`statusCode: ${req.statusCode}`);
 
      req.on('data', rawData => {
        const data = rawData.toString();
        body += data;        
      });

      req.on('end', () => {
        if (!type || isList) {
          // request was for a list
          resolve(body);
        }
    
        // request was for a page of images
        const newBody = dataModel.updateData(body);

        resolve(newBody);
      });
    });
  
    req.on('error', error => {
      console.error(error);
      reject(error);
    });
  
    req.end();    
  });
};