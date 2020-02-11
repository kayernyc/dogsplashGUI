import DogModel from './index';

interface ResultObject {
  data: string;
}

describe('DogModel constructQuery', () => {
  test('it should parse one parameter', () => {
    expect(DogModel.constructQuery('baseURL', {'type': 'dog'}))
    .toBe('baseURL?type=dog');
  });

  test('it should parse mulitple parameters', () => {
    expect(DogModel.constructQuery('baseURL', {'type': 'dog', 'key': 'lock', 'fruit': 'salad'}))
    .toBe('baseURL?type=dog&key=lock&fruit=salad');
  });

  test('it should return just base if no queries', () => {
    expect(DogModel.constructQuery('baseURL'))
    .toBe('baseURL');
  });

  test('it should return just base if query object is empty', () => {
    expect(DogModel.constructQuery('baseURL', {}))
    .toBe('baseURL');
  });
});

describe('DogModel callAPIforData', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => 'bob');
  });
  
  test('it should parse one parameter', () => {
    DogModel.callAPIforData().then((res: ResultObject) => {
      expect(res.data).toEqual('bob');
    });
  });
});

