"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const QueueServer_1 = require("./QueueServer");
;
let docs = [];
class ConsumptionClass {
    constructor() {
        this.pagesize = 500;
        this.onceTime = 2000;
    }
    cronWork() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                docs = yield QueueServer_1.QueueServer.getLastFromDb(this.pagesize, {});
                for (let i = 0; i < docs.length; i++) {
                    yield QueueServer_1.QueueServer.removeDb(docs[i]._id);
                }
                docs = [];
                setTimeout(() => {
                    this.cronWork();
                    console.log("500条删除完毕！");
                }, this.onceTime);
            }
            catch (e) {
                console.log("Consumption error ===", e);
                setTimeout(() => {
                    this.cronWork();
                }, this.onceTime);
            }
        });
    }
}
exports.Consumption = new ConsumptionClass();
