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
    // console.log(arg);
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
    return this.queens.find({hive:hiveId}).exec().then(res=>{

      return res
    });
  }

  hiveQueen(hiveId){
    return this.queens.find({hive:hiveId}).exec().then(res=>{

      return res[0]
    });
  }

  singleQueen(queenId){
    return this.queens.findById(queenId).exec().then(res=>{

      return res;
    });
  }

  purge(hiveID){
    // console.log(hiveID);
    return this.bees.remove({hive:hiveID, producing:false}).exec().then(res=>{
      // console.log(res);
      // console.log("purged, getting remaining");
      // console.log(hiveID);
      return this.bees.find({hive:hiveID}).exec().then(res=>{
        // console.log(res);
        return res;
      });
    })
  }

  removeBee(beeID){
    return this.bees.findById(beeID).remove().exec().then(res=>{
      // console.log(res);
      return ["deadBee"];
    })
  }


}
