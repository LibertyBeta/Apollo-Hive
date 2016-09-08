import _ from "lodash";
import casual from "casual";
import HiveConnector from "./hive.connector";
import BeeConnector from "./bee.connector";
import {db, HiveModel, CustomersModel, HoneyHarvestModel} from "./datasources/sql.datastore";
import {Bees, Queens} from "./datasources/mongo.datastore";

// casual.seed(123);
db.sync({ force: true }).then(()=> {
  _.times(10, ()=> {
    //First, create a bunch of random CustomersModel
    let customers = [];
    _.times(20, ()=>{
      return CustomersModel.create({
        Name: casual.Name,
        Address: casual.address,
      }).then(customer=> customers.push(customer));
    });

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
          collectedOn: casual.unix_time ,
          amount: 1,
          qualtiy: 1,
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
  BeeConnector
};

export default Connectors
