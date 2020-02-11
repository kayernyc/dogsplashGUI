import DogModel from './index';

describe('DogModel', () => {
  test('constructQuery should parse one parameter', () => {
    expect(DogModel.constructQuery('baseURL', {'type': 'dog'}))
    .toBe('baseURL?type=dog');
  });

  test('constructQuery should parse mulitple parameters', () => {
    expect(DogModel.constructQuery('baseURL', {'type': 'dog', 'key': 'lock', 'fruit': 'salad'}))
    .toBe('baseURL?type=dog&key=lock&fruit=salad');
  });

  test('constructQuery should return just base if no queries', () => {
    expect(DogModel.constructQuery('baseURL'))
    .toBe('baseURL');
  });

  test('constructQuery should return just base if query object is empty', () => {
    expect(DogModel.constructQuery('baseURL', {}))
    .toBe('baseURL');
  });
});

