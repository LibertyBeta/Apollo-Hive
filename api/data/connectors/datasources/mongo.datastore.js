import Mongoose from 'mongoose';
import _ from "lodash";

Mongoose.Promise = global.Promise;

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


export {Queens, Bees};
