"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const PORT = 3000;
const all_1 = require("./routes/all");
const dataModel_1 = __importDefault(require("./dataModel"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = http_1.default.createServer((req, res) => {
    const parts = url_1.default.parse(req.url, true);
    const dataModel = new dataModel_1.default();
    // console.log(parts.query);
    const { type } = parts.query;
    // If user passes in a new type
    if (type && type !== dataModel.currentType) {
        console.log(`TYPE ${type}`);
        dataModel.updateType(type);
    }
    else {
        console.log('NO TYPE');
    }
    req.on('error', err => {
    })
        .on('data', (chunck) => {
        const body = [];
        const postData = '{"login":"toto","password":"okay","duration":"9999"}';
        body.push(postData);
    })
        .on('end', () => {
        all_1.handleRequest(req, res);
    });
})
    .listen(PORT);
//# sourceMappingURL=server.js.map