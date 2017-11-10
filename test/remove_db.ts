import {QueueServer} from "../QueueServer";
const QUERYCOUNT = 500;
let count = 0;
interface Data {
    _id: number
};

let docs:Data[] = [];

let init = async ()=>{
    await QueueServer.initDB();
}

init();

let remove = async ( ) => {

    while( count == 0 || (count != 0 && docs.length > 0)  ){
        count++;
        docs = await QueueServer.getLastFromDb( QUERYCOUNT, {});
        if( docs.length === 0 ){
            console.log("删除完毕")
        }else{
            console.log( `删除${QUERYCOUNT}条！======${count}`);
        }

        for( let i = 0; i < docs.length; i ++ ){
            await QueueServer.removeDb( docs[i]._id );
        }
        docs = [];

    }

    setTimeout(()=>{
        remove();
    }, 2000 )

}

remove();


