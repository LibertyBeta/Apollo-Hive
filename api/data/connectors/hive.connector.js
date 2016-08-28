import {db, HiveModel, HoneyHarvestModel} from "./datasources/sql.datastore";
import {Bees, Queens} from "./datasources/mongo.datastore";


export default class HiveConnector {

  constructor() {
    this.Hives = HiveModel;
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

  all(){
    return this.Hives.findAll({include:[HoneyHarvestModel]})
      .then(findResult=>{
        let flat = [];
        for(let result of findResult){
          flat.push(result.get());
        }
        // console.log(flat);
        return flat;
      });

  }

  single(id){
    return this.Hives.findById(id,{include:[HoneyHarvestModel]}).then(instance=>instance.get());
  }


  flatten(fieldSet){
    let flat = [];
    for(let result of fieldSet){
      flat.push(result.get());
    }
    // console.log(flat);
    return flat;
  }

  swarm(id){
    return Bees.find({hive:id}).exec().then(res=>{
      return res;
    })
    // return [];
  }
}
