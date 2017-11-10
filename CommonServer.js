"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var jsonParser = bodyParser.json();
var CommonServer = (function () {
    function CommonServer() {
        this.app = express();
        this.app.use(logger('[:date[iso]] :remote-addr :method :url :status  :response-time ms'));
        this.app.use(bodyParser.json({ limit: '100mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));
        this.app.disable("x-powered-by");
    }
    return CommonServer;
}());
exports.CommonServer = CommonServer;
