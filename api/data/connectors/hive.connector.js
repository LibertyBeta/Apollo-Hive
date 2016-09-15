import {db, HiveModel, HoneyHarvestModel} from "./datasources/sql.datastore";
import {Bees, Queens} from "./datasources/mongo.datastore";
import Restling from "restling";
import Redis from "redis";
import {Bluebird, Promise} from "bluebird";



export default class HiveConnector {

  constructor() {
    let result = Promise.promisifyAll(Redis);

    this.redis = result.createClient();
    // console.log(this.redis);
    // Bluebird.promisifyAll(Redis.Multi.prototype);

    // console.log(this.redis);
    this.cacheTry = 0;
    this.lastWeather = {};
    this.weatherData = {};
    this.weatherToken ="669e107fbadf26c41ac3d1baafd6368c";
    this.Hives = HiveModel;
  }

  get(value){
    return value;
  }

  id(arg){

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

  getLastHarvest(id){
    return new Date();
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

  cacheWeather(id, weather){
    this.cacheTry++;
    // console.log('caching');
    // console.log(this.cacheTry);
    let now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    this.lastWeather[id] = now;
    this.weatherData[id] = weather;
  }

  weather(id, lat, lng){
    // console.log("getting Weather data");

    return this.redis.getAsync(id).then((result)=>{
      let now = new Date();
      now.setMinutes(now.getMinutes() - 30);
      // console.log(Object.keys(result));
      result = JSON.parse(result);
      // console.log(result);
      if(result === null || result.checked < now.valueOf() ){
        // console.log("send data");
        return Restling.get('https://api.forecast.io/forecast/'+this.weatherToken+'/'+lat+','+lng)
          .then((result)=>{
            // console.log("Got weather data");
            let currently = result.data.currently;
            currently['checked'] = (new Date()).valueOf();
            this.redis.set(id, JSON.stringify(currently));
            return currently;
          })
      } else {
        // console.log("sending stored data");
        return result;
      }
    })

  }
}
