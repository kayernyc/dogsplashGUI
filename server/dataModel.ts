interface DataModel {
  currentType: string | string[];
  currentPage: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentData: any;
}

class DataModel implements DataModel {
  currentType: string | string[] = '';
  currentPage = 0;
  currentData: any = [];

  updateType = (type: string | string[], page = 0) => {
    console.log(`I heard ${type} and ${page}`);
    console.log('this', this.currentType);
    this.currentType = type;
    this.currentPage = page;
  }
  updateData = (data: any, page = 0) => {
    console.log(`From dataModel ${data} at page ${page}`);
    this.currentData = data;
  }
  updatePage = (page: number) => {
    return `update page ${page}`;
  }
};

export default DataModel;
