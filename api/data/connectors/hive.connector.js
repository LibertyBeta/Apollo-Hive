import {db, HiveModel} from "./datasources/sql.datastore"

export default class HiveConnector {

  constructor() {
    this.Hives = HiveModel;
  }

  id(arg){
    console.log(arg);
    return 0;
  }

  name(args){
    return "Some Hive";
  }

  all(){
    return this.Hives.findAll()
      .then(findResult=>{
        let flat = [];
        for(let result of findResult){
          flat.push(result.get());
        }
        // console.log(flat);
        return flat;
      });

  }

  single(){
    return {};
  }

}
