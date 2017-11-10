/**
 * Created by lwq on 2017/8/3.
 */

import * as Datastore from "nedb";
import {DataStoreOptions} from "nedb";
import * as _ from "lodash";
import * as BlueBird from "bluebird";


class QueueServerClass{

     private db:Datastore;
     private lastId:number = 0;
     private filename:string = __dirname + "/cache/Queue.db";

     constructor(){
       // this.initDB();
     }


    async initDB(){
         let option:DataStoreOptions = {
              filename:this.filename,
              autoload:true
         };
         this.db = new Datastore(option);
         this.db.persistence.setAutocompactionInterval(300000);
        //  this.db.ensureIndex({fieldName:"host"},function (err: Error) {
        //     if(err){
        //         console.log("index Error",err);
        //     }
        //  });
        // this.db.ensureIndex({fieldName:"_id"},function (err: Error) {
        //     if(err){
        //         console.log("index _id Error",err);
        //     }
        // });
         this.lastId = await this.getLastId();
     }


    async getLastFromDb(num:number,query:any = {}):Promise<any>{
        var self = this;
        return new BlueBird(function (resolve, reject) {
            self.db.find(query).sort({_id:1}).limit(num).exec(function (err: Error, document: object[]) {
                 if(err){
                     reject(err);
                 }else{
                     resolve(document);
                 }
            });
        })
        .timeout(1000 * 60 * 10)
        .catch(BlueBird.TimeoutError,function (error) {
              throw error;
        })
    }


    async insertDb(obj:object):Promise<any>{
        this.lastId++;
        obj["_id"] = this.lastId;
        var self = this;
        return new BlueBird(function (resolve, reject) {
            self.db.insert(obj, function (err: Error, document: object) {
                if (err) {
                    reject(err);
                } else {
                    resolve(document);
                }
            })
        }).timeout(1000 * 60 * 10)
            .catch(BlueBird.TimeoutError, function (error) {
                throw error;
            })
     }

     async removeDb(id:number):Promise<any>{
         var self = this;
         return new BlueBird(function (resolve, reject) {
             self.db.remove({_id:id}, {}, function (err:Error, numRemoved:number) {
                 if(err){
                     reject(err)
                 }else{
                     resolve(numRemoved);
                 }
             });
         }) .timeout(1000 * 60 * 10)
             .catch(BlueBird.TimeoutError,function (error) {
                 throw error;
             })
     }



    async removeAllDb():Promise<any>{
        var self = this;
        return new BlueBird(function (resolve, reject) {
            self.db.remove({}, { multi: true }, function (err:Error, numRemoved:number) {
                if(err){
                    reject(err)
                }else{
                    resolve(numRemoved);
                }
            });
        }) .timeout(1000 * 60 * 10)
            .catch(BlueBird.TimeoutError,function (error) {
                throw error;
            })
    }


    private async getLastId():Promise<any>{
         var self = this;
         return new BlueBird(function (resolve, reject) {
             self.db.find({}).sort({_id:-1}).limit(1).exec(function (err: Error, document: any) {
                  if(err){
                      reject(err);
                  }else{
                      if(!_.isEmpty(document) && _.isArray(document)){
                          resolve(document[0]._id);
                      }else{
                          resolve(0);
                      }
                  }
             });
         }) .timeout(1000 * 60 * 10)
             .catch(BlueBird.TimeoutError,function (error) {
                 throw error;
             })
     }


}

export let  QueueServer = new QueueServerClass();



