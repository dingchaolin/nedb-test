"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
var jsonParser = bodyParser.json();
class CommonServer {
    constructor() {
        this.app = express();
        this.app.use(logger('[:date[iso]] :remote-addr :method :url :status  :response-time ms'));
        this.app.use(bodyParser.json({ limit: '100mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));
        this.app.disable("x-powered-by");
    }
}
exports.CommonServer = CommonServer;
