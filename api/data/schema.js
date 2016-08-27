'use strict';

// const ShipmentMock = require('./models/mocks').Shipment;
// const ProducttMock = require('./models/mocks').Product;

const Schema = [`
  type Hive {
    id: String ,
    name: String 

    lastCollection: String,
    collections: [HoneyCollection]
    queenBee: [QueenBee],
    swarm: [Swarm]
  }

  type HoneyCollection {
    collectedOn: String ,
    amount: Float ,
    quality: String ,
  }


  type QueenBee {
    id: String ,
    insceptDate: String ,
    qualtiy: String ,
    notes: [String] 
  }

  type Bee {
    id: String ,
    inceptDate: String ,
    producing: Boolean ,
  }


  type Swarm {
    bees: [Bee]
  }



  type Query {
    # hives
    hives: [Hive]
    hive (id: String): Hive


  }

  type Mutation {
    killBee(
      id: String ,
    ): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

export default Schema;
