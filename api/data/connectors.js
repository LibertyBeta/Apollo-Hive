import Sequelize from 'sequelize';
import Mongoose from 'mongoose';
import casual from 'casual';
import rp from 'request-promise';
import _ from 'lodash';

const db = new Sequelize('hives', null, null, {
  dialect: 'sqlite',
  storage: './hives.sqlite',
  logging: false,
});

//SQL
const HiveModel = db.define('hive', {
  Name: {
    type: Sequelize.STRING,
  },
  lat: {
    type: Sequelize.FLOAT,
  },
  log: {
    type: Sequelize.FLOAT,
  }
});

const HoneyCollectionModel = db.define('honeycollection', {
  CollectedOn: {
    type: Sequelize.DATE
  },
  Amount: {
    type: Sequelize.FLOAT,
  },
  Quality: {
    type: Sequelize.STRING(1)
  }
});

const CustomersModel = db.define('customer', {
  Name: {
    type: Sequelize.STRING
  },
  Address: {
    type: Sequelize.STRING
  }
})


//Collections
const mongo = Mongoose.connect('mongodb://localhost/insects', (err) => {
  if(err){
    console.error('Could not connect to MongoDB on port 27017');
  }
});

const QueenSchema = Mongoose.Schema({
  inceptDate: Date,
  size: Number,
  qualtiy: String,
  notes: Array,
  stages: Array,
  hive: String,
})

const BeeSchema = Mongoose.Schema({
  hive: String,
  inceptDate: Date,
  producing: Boolean,
})

const Queens = Mongoose.model('queen', QueenSchema);
const Bees = Mongoose.model('bee', BeeSchema);
// Relations
HiveModel.hasMany(HoneyCollectionModel);
HoneyCollectionModel.belongsTo(HiveModel);

CustomersModel.hasMany(HoneyCollectionModel);

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


const Hive = db.models.hive;
const HoneyCollection = db.models.honecollection;
const Customer = db.models.customer;


export {  };
