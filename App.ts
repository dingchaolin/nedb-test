
import * as express from "express";
import {CommonServer} from "./CommonServer";
import {ServeStaticOptions} from "serve-static";

import {QueueServer} from "./QueueServer";
import {Consumption} from "./Consumption";




async function setApp(){
    await QueueServer.initDB();

    await Consumption.cronWork();

    let app = new CommonServer().app;
    app.listen(3000);
    console.log('HTTP server listening on port: 3000');


    let options:ServeStaticOptions = {
        dotfiles: 'ignore',
        etag: false,
        extensions: ['css', 'js','jpg','png','jpeg','gif','html','htm','txt'],
        index: false,
        redirect: false,
    }

    app.use("/static",express.static("static",options));

    app.use("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        for( let i = 0; i < 10000000000; i ++ ){
            let data = {
                name:`dcl`,
                age:i,
                http:"www.baidu.com",
                ip:"192.168.64.85",
                company:"artron",
                webnet:"www.artron.net"
            };
            await QueueServer.insertDb(data);
            if( i % 1000 === 0 ){
                console.log('插入1000条记录======='+ i/1000 );
            }
        }
        res.end("插入完毕！")
    });




}

setApp();



