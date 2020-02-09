"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataModel {
    constructor() {
        this.currentType = '';
        this.currentPage = 0;
        this.currentData = [];
        this.updateType = (type, page = 0) => {
            console.log(`I heard ${type} and ${page}`);
            console.log('this', this.currentType);
            this.currentType = type;
            this.currentPage = page;
        };
        this.updateData = (data) => {
            this.currentData = data;
        };
    }
}
;
exports.default = DataModel;
//# sourceMappingURL=dataModel.js.map