import _ from "lodash";
import casual from "casual";
import HiveConnector from "./hive.connector";
import BeeConnector from "./bee.connector";
import HoneyHarvestConnector from "./honeyharvest.connector";
import {db, HiveModel, CustomersModel, HoneyHarvestModel} from "./datasources/sql.datastore";
import {Bees, Queens} from "./datasources/mongo.datastore";

// casual.seed(123);
Bees.remove({}, (e)=>{});
Queens.remove({}, (e)=>{});
db.sync({ force: true }).then(()=> {
  let customers = [];
  _.times(20, ()=>{
    return CustomersModel.create({
      Name: casual.full_name,
      Address: casual.address,
    }).then(customer=> customers.push(customer));
  });
  _.times(130, ()=> {
    //First, create a bunch of random CustomersModel


    return HiveModel.create({
      Name: casual.title ,
      lat: casual.latitude,
      lng: casual.longitude
    }).then(Hive => {
      //Create a Bee.
      _.times(100, (iteration)=>{
        new Bees({
          hive:Hive.id,
          inceptDate: new Date(),
          producing: casual.coin_flip ,
        }).save();
      });
      new Queens({
        inceptDate: new Date(),
        size: casual.integer(1, 10),
        qualtiy: casual.catch_phrase,
        notes: casual.array_of_words(7),
        stages: casual.array_of_words(7),
        hive: Hive.id,
      }).save();

      //Create a Queen.
      _.times(5, ()=>{
        // console.log(Hive);
        return Hive.createHoneyharvest({
          CollectedOn: casual.unix_time,
          Amount: casual.double(0.1, 12.0),
          Quality: casual.letter,
        }).then(Honey => {
          _.times(5, ()=>{
            let randomCustomer = customers[Math.floor(Math.random()*customers.length)];
            randomCustomer.setHoneyharvests(Honey);
          });
        })
      });
    });
  });
});

const Connectors = {
  HiveConnector,
  BeeConnector,
  HoneyHarvestConnector,
};

export default Connectors
