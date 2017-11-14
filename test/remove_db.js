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
const QueueServer_1 = require("../QueueServer");
const QUERYCOUNT = 500;
let count = 0;
;
let docs = [];
let init = () => __awaiter(this, void 0, void 0, function* () {
    yield QueueServer_1.QueueServer.initDB();
});
init();
let remove = () => __awaiter(this, void 0, void 0, function* () {
    while (count == 0 || (count != 0 && docs.length > 0)) {
        count++;
        docs = yield QueueServer_1.QueueServer.getLastFromDb(QUERYCOUNT, {});
        if (docs.length === 0) {
            console.log("删除完毕");
        }
        else {
            console.log(`删除${QUERYCOUNT}条！======${count}`);
        }
        for (let i = 0; i < docs.length; i++) {
            yield QueueServer_1.QueueServer.removeDb(docs[i]._id);
        }
        docs = [];
    }
    setTimeout(() => {
        remove();
    }, 2000);
});
remove();
