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
let insert = () => __awaiter(this, void 0, void 0, function* () {
    yield QueueServer_1.QueueServer.initDB();
    for (let i = 0; i < 10000000000; i++) {
        let data = {
            name: `dcl`,
            age: i,
            http: "www.baidu.com",
            ip: "192.168.64.85",
            company: "artron",
            webnet: "www.artron.net"
        };
        yield QueueServer_1.QueueServer.insertDb(data);
        if (i % 1000 === 0) {
            console.log('插入1000条记录=======' + i / 1000);
        }
    }
    console.log("插入完毕！");
});
insert();
