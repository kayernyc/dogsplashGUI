import 'core-js/stable';
import 'regenerator-runtime/runtime';

const API_BASE_URL = 'http://localhost:3000/';

const dogContainer = document.getElementById('dogs');
const dogModal = document.getElementsByClassName('modal')[0];

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

const paginationButton = (value: number, title: string) => {
  const button = document.createElement('button');
  button.setAttribute('value', `${value}`);
  button.innerHTML = title;
  button.onclick = getPage;
  return button;
};

const modalOpen = (event: Event) => {
  dogModal.classList.add('open');
  dogModal.innerHTML = `<img src="${event.target.src}" alt="dog full size">`;
};

const modalClose = () => {
  dogModal.classList.remove('open');
  dogModal.innerHTML = '';
};

const dogThumbnails = (response: any) => {
  const { pageItems, prevPage, nextPage} = response.data;

  dogContainer.innerHTML = '';
  dogContainer.innerHTML = `<section class="dog-thumbnails">${pageItems.reduce((acc: string, url: string) => {
    acc += `<div class="col"><img class="dog-trigger" src="${url}" alt="dog"/></div>`;
    return acc;
  }, '')}</section>`;

  const allImages = dogContainer.getElementsByClassName('dog-trigger');
  Array.from(allImages)
    .forEach((element: HTMLImageElement )=> {
      element.addEventListener('click', modalOpen);
    });

  if (nextPage !== undefined) {
    const button = paginationButton(nextPage, 'next page');
    dogContainer.prepend(button);
  }

  if (prevPage !== undefined) {
    const button = paginationButton(prevPage, 'previous page');
    dogContainer.prepend(button);
  }
};

const getDogType = async (event: Event) => {
  const select = event.target as HTMLFormElement;
  const response = await callAPIforData({type: select.value});
  dogThumbnails(response);
};

const getPage = async (event: Event) => {
  const button: HTMLButtonElement = event.target as HTMLButtonElement;
  const response = await callAPIforData({page: parseInt(button.value)});
  dogThumbnails(response);
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

  const event = new CustomEvent('change', {target: selectElement});
  selectElement.dispatchEvent(event);

  return form;
};

const initPage = async () => {
  const selection = document.getElementById('selction');
  const dropDownItems = await callAPIforData();
  selection.appendChild(createDropDown(dropDownItems));
  dogModal.addEventListener('click', modalClose);
};

initPage();
