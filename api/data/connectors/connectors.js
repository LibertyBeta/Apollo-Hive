import Sequelize from 'sequelize';
import Mongoose from 'mongoose';
import casual from 'casual';
import rp from 'request-promise';
import _ from 'lodash';


casual.seed(123);
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
      log: casual.longitude
    }).then(Hive => {
      _.times(5, ()=>{
        // console.log(Hive);
        return Hive.createHoneycollection({
          collectedOn: casual.unix_time ,
          amount: 1,
          qualtiy: 1,
        }).then(Honey => {
          _.times(5, ()=>{
            let randomCustomer = customers[Math.floor(Math.random()*customers.length)];
            randomCustomer.setHoneycollections(Honey);
          });
        })
      });
    });
  });
});


const Hives = db.models.hive;
const HoneyCollection = db.models.honecollection;
const Customer = db.models.customer;

const Connectors = {
  Hives: HiveModel,
  HoneyHarvest: HoneyHarvestConnector,
  Customer: CustomersModel,
  Queens,
  Bees,
};

console.log(Connectors);
export default Connectors
