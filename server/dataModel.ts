interface DataModel {
  currentType: string | string[];
  currentPage: number;
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
  updateData = (data: any) => {
    this.currentData = data;
  }
};

export default DataModel;
