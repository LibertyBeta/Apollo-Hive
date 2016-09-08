'use strict';

// const ShipmentMock = require('./models/mocks').Shipment;
// const ProducttMock = require('./models/mocks').Product;

const Schema = [`
  type Hive {
    id: String ,
    name: String
    lastCollection: String,
    location: HiveLocation,
    harvests: [HoneyHarvest],
    queen: [QueenBee],
    bees: [Bee],
    weather: Weather
  }

  type HiveLocation {
    lat: Float,
    lng: Float
  }
  type HoneyHarvest {
    collectedOn: String ,
    amount: Float ,
    quality: String ,
  }


  type QueenBee {
    id: String ,
    insceptDate: String ,
    qualtiy: [String] ,
    notes: [String]!
  }

  type Bee {
    id: String ,
    inceptDate: String ,
    producing: Boolean ,
  }


  type Swarm {
    bees: [Bee]
  }

  type Weather {
    condition: String,
    temperature: Float,
    coniditonString: String,
    wind: String,
  }



  type Query {
    # hives
    hives: [Hive]
    hive (id: String): Hive
    queen(id: String): QueenBee

  }

  type Mutation {
    killBee(
      id: String ,
    ): Boolean,
    purgeSwarm(
      id: String,
    ): Swarm
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

export default Schema;
