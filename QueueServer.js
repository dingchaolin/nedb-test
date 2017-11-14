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
const Datastore = require("nedb");
const _ = require("lodash");
const BlueBird = require("bluebird");
class QueueServerClass {
    constructor() {
        this.lastId = 0;
        this.filename = __dirname + "/cache/Queue.db";
    }
    initDB() {
        return __awaiter(this, void 0, void 0, function* () {
            let option = {
                filename: this.filename,
                autoload: true
            };
            this.db = new Datastore(option);
            this.db.persistence.setAutocompactionInterval(300000);
            this.lastId = yield this.getLastId();
        });
    }
    getLastFromDb(num, query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var self = this;
            return new BlueBird(function (resolve, reject) {
                self.db.find(query).sort({ _id: 1 }).limit(num).exec(function (err, document) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(document);
                    }
                });
            })
                .timeout(1000 * 60 * 10)
                .catch(BlueBird.TimeoutError, function (error) {
                throw error;
            });
        });
    }
    insertDb(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lastId++;
            obj["_id"] = this.lastId;
            var self = this;
            return new BlueBird(function (resolve, reject) {
                self.db.insert(obj, function (err, document) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(document);
                    }
                });
            }).timeout(1000 * 60 * 10)
                .catch(BlueBird.TimeoutError, function (error) {
                throw error;
            });
        });
    }
    removeDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var self = this;
            return new BlueBird(function (resolve, reject) {
                self.db.remove({ _id: id }, {}, function (err, numRemoved) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(numRemoved);
                    }
                });
            }).timeout(1000 * 60 * 10)
                .catch(BlueBird.TimeoutError, function (error) {
                throw error;
            });
        });
    }
    removeAllDb() {
        return __awaiter(this, void 0, void 0, function* () {
            var self = this;
            return new BlueBird(function (resolve, reject) {
                self.db.remove({}, { multi: true }, function (err, numRemoved) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(numRemoved);
                    }
                });
            }).timeout(1000 * 60 * 10)
                .catch(BlueBird.TimeoutError, function (error) {
                throw error;
            });
        });
    }
    getLastId() {
        return __awaiter(this, void 0, void 0, function* () {
            var self = this;
            return new BlueBird(function (resolve, reject) {
                self.db.find({}).sort({ _id: -1 }).limit(1).exec(function (err, document) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (!_.isEmpty(document) && _.isArray(document)) {
                            resolve(document[0]._id);
                        }
                        else {
                            resolve(0);
                        }
                    }
                });
            }).timeout(1000 * 60 * 10)
                .catch(BlueBird.TimeoutError, function (error) {
                throw error;
            });
        });
    }
}
exports.QueueServer = new QueueServerClass();
