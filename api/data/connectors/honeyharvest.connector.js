import {db, HoneyHarvestModel} from "./datasources/sql.datastore"

export default class HoneyHarvestConnector {

  constructor() {
    this.Harvests = HoneyHarvestModel;
  }

  id(arg){
    console.log(arg);
    return 0;
  }

  name(args){
    return "Some Hive";
  }

  all(){
    return this.Harvests.findAll()
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
