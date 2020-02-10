interface DataModel {
  currentType: string | string[];
  currentPage: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentData: Array<string>;
  currentMaxPage: number;
}

const NUM_ITEMS_ON_PAGE = 10;

class DataModel implements DataModel {
  currentType: string | string[] = '';
  currentPage = 0;
  currentData: Array<string>;
  currentMaxPage = 0;

  updateType = (type: string | string[]) => {
    this.currentType = type;
  }

  updateData = (data: any, page = 0) => {
    data = JSON.parse(data);
    this.currentData = data.message;
    this.currentMaxPage = Math.floor(this.currentData.length / 10) - 1;

    return (this.updatePage(page));
  }

  updatePage = (page: number) => {
    // is page number in range?
    page = Math.min(page, this.currentMaxPage);
    let nextPage: number;
    let prevPage: number;

    if (page < this.currentMaxPage) {
      nextPage = page + 1;
    }

    if (page > 0) {
      prevPage = page -1;
    }

    const offset = page * NUM_ITEMS_ON_PAGE;
    const pageItems = this.currentData.slice(offset, offset + NUM_ITEMS_ON_PAGE);
    return {nextPage, pageItems, prevPage};
  }
};

export default DataModel;
