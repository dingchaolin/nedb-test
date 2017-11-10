import {QueueServer} from "../QueueServer";


let insert = async () => {
    await QueueServer.initDB();
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

    console.log( "插入完毕！")
}

insert();