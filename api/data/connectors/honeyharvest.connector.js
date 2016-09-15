import {db, HoneyHarvestModel, CustomersModel} from "./datasources/sql.datastore"

export default class HoneyHarvestConnector {

  constructor() {
    this.Harvests = HoneyHarvestModel;
    this.Customers = CustomersModel;
  }

  id(arg){
    // console.log(arg);
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

  hiveHarvests(hiveId){
    return this.Customers.findAll({attributes: { exclude: ['id'] },include:[{model:HoneyHarvestModel, where:{hiveId:hiveId}}]}).then(findResult=>{
      let flat = [];
      for(let result of findResult){
        let customer = result.get();
        for(let harvest of customer.honeyharvests){
          flat.push(Object.assign(harvest.get(), customer));
        }

      }
      return flat;
    })
  }

}
