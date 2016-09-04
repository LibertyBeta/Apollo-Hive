import {db, HiveModel, HoneyHarvestModel} from "./datasources/sql.datastore";
import {Bees, Queens} from "./datasources/mongo.datastore";


export default class BeeConnector {

  constructor() {
    this.bees = Bees;
    this.queens = Queens;
  }

  get(value){
    return value;
  }

  id(arg){
    console.log(arg);
    return 0;
  }

  name(args){
    return "Some Hive";
  }

  allBees(){
    return this.bees.find().exec().then(res=>{
      return res;
    })
  }

  allQueens(){
    return this.queens.find({hive:id}).exec().then(res=>{
      return res;
    })
  }


  swarm(id){
    return this.bees.find({hive:id}).exec().then(res=>{
      return res;
    })
    // return [];
  }

  bee(id){
    return this.bees.find({hive:id}).exec().then(res=>{return res});
  }

  queen(hiveId){
    return this.queens.find({hive:hiveId}).exec().then(res=>{return res});
  }
}
