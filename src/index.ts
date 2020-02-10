import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { stringify } from 'querystring';

const API_BASE_URL = 'http://localhost:3000/';

const dogContainer = document.getElementById('dogs');

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

const getPage = async (event: Event) => {
  console.log(event);
};

const paginationButton = (value: number, title: string) => {
  const button = document.createElement('button');
  button.setAttribute('value', `${value}`);
  button.innerHTML = title;
  button.onclick = getPage;
  return button;
};

const getDogType = async (event: Event) => {
  const select = event.target as HTMLFormElement;
  const newResponse = await callAPIforData({type: select.value});
  const { pageItems, prevPage, nextPage} = newResponse.data;
  console.log(pageItems);

   // clear container first
   dogContainer.innerHTML = '';
   dogContainer.innerHTML = `${pageItems.reduce((acc: string, url: string) => {
     acc += `<div class="col"><img src="${url}" alt="dog"/></div>`;
     return acc;
   }, '')}`;

  if (prevPage !== undefined) {
    const button = paginationButton(prevPage, 'previous page');
    dogContainer.prepend(button);
  }

  if (nextPage !== undefined) {
    const button = paginationButton(nextPage, 'next page');
    dogContainer.append(button);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createDropDown = (obj: any) => {
  const dogTypes = Object.keys(JSON.parse(obj.data).message);
  const form = document.createElement('form');
  form.innerHTML = `<legend>select a breed</legend><select id="dogList"">${dogTypes.reduce((acc: string, type: string) => {
    return acc += `<option value = "${type}">${type}</option>`;
  }, '')}</select>`;

  const selectElement: HTMLFormElement = form.querySelector('#dogList');
  selectElement.addEventListener('change', getDogType);

  return form;
};

const initPage = async () => {
  const app = document.getElementById('selction');
  const dropDownItems = await callAPIforData();
  app.appendChild(createDropDown(dropDownItems));

  
  callAPIforData({type: 'hound'});
};

initPage();
