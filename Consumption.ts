/**
 * Created by lwq on 2017/8/4.
 */
import {QueueServer} from "./QueueServer";
interface Data {
    _id: number
};
let docs:Data[] = [];
class ConsumptionClass{

    private readonly pagesize = 500;
    private onceTime:number = 2000;

    async cronWork(){
        try {

            docs = await QueueServer.getLastFromDb( this.pagesize, {});
            for( let i = 0; i < docs.length; i ++ ){
                await QueueServer.removeDb( docs[i]._id );
            }
            docs = [];
            setTimeout(()=>{
                 this.cronWork();
                 console.log("500条删除完毕！")
            },this.onceTime)
        }catch (e){
            console.log("Consumption error ===",e);

            setTimeout(()=>{
                this.cronWork();
            },this.onceTime)

        }

    }


}
export  let Consumption = new ConsumptionClass();