import * as express from "express";
import {Express} from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan"

var jsonParser = bodyParser.json();

export class CommonServer{

    public app:Express;

    constructor(){
        this.app = express();
        this.app.use(logger('[:date[iso]] :remote-addr :method :url :status  :response-time ms'));
        this.app.use(bodyParser.json({limit: '100mb'}));
        this.app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));
        this.app.disable("x-powered-by");
    }
}


