import 'core-js/stable';
import 'regenerator-runtime/runtime';

const API_BASE_URL = 'http://localhost:3000/';

const constructQuery = (base: string, query: object) => {
  const keyMap = Object.keys(query);
  return keyMap.reduce((acc: string, key: string, index: number)=> {
    acc += `${key}=${query[key]}`;

    if (index < keyMap.length -1){
      acc += '&';
    }
    
    return acc;
  }, `${base}?`);
};

const callAPIforData = async (query?: object) => {
  return new Promise((resolve, reject)=> {
    let url = API_BASE_URL;

    if (query) {
      url = constructQuery(API_BASE_URL, query);
    }
  
    fetch(url, {
      method: 'GET',
      headers: new Headers(
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      ),
    })
    .then(data => data.json())
    .then(data => {
      resolve(data);
    })
    .catch((err)=> {
      reject(err);
    });
  });
  
};

const initPage = async () => {
  const dropDownItems = await callAPIforData();
  console.log(dropDownItems);
  callAPIforData({type: 'hound'});
};

initPage();
