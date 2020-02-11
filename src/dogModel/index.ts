type QueryObject = {
  [key: string]: string | number | QueryObjectDogImages;
}

export interface QueryObjectDogImages {
  pageItems?: Array<string>;
  prevPage?: number;
  nextPage?: number;
  totalImages: number;
}

export interface QueryObjectDogTypes {
  data: string;
}

export type DogAPIResponse = {
  [key: string]: string | number | Array<string> | QueryObjectDogTypes;
}

class DogModel {
  static API_BASE_URL = 'http://localhost:3000/';

  static constructQuery = (base: string, query?: QueryObject) => {
    if (query) {
      const keyMap = Object.keys(query) as Array<string>;

      if (keyMap.length < 1) {
        return base;
      }

      return keyMap.reduce((acc: string, key: string, index: number)=> {
        acc += `${key}=${query[key]}`;
  
        if (index < keyMap.length -1){
          acc += '&';
        }
        
        return acc;
      }, `${base}?`);
    }
    return base;
  };

  static callAPIforData = async (query?: QueryObject): Promise<string | DogAPIResponse> => {
    return new Promise((resolve, reject)=> {
      let url = DogModel.API_BASE_URL;

      if (query) {
        url = DogModel.constructQuery(DogModel.API_BASE_URL, query);
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
};

export default DogModel;

