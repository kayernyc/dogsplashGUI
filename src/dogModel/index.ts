type QueryObject = {
  [key: string]: string;
}

class DogModel {
  static API_BASE_URL = 'http://localhost:3000/';

  static constructQuery = (base: string, query: QueryObject) => {
    const keyMap = Object.keys(query) as Array<string>;
    return keyMap.reduce((acc: string, key: string, index: number)=> {
      acc += `${key}=${query[key]}`;

      if (index < keyMap.length -1){
        acc += '&';
      }
      
      return acc;
    }, `${base}?`);
  };

  static callAPIforData = async (query?: object) => {
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