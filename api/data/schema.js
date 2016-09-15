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
    id: String,
    customer: String,
    collectedOn: String ,
    amount: Float ,
    quality: String ,
  }


  type QueenBee {
    id: String ,
    inceptDate: String ,
    qualtiy: [String] ,
    notes: [String]!
  }

  type Bee {
    id: String ,
    inceptDate: String ,
    producing: Boolean ,
  }


  type Swarm {
    queen: QueenBee
    bees: [Bee]
  }

  type Weather {
    condition: String,
    temperature: Float,
    coniditonString: String,
    wind: String
  }



  type Query {
    # hives
    hives: [Hive]
    hive (id: String): Hive
    queen(id: String): QueenBee
    swarm(id: String): Swarm
    harvests(id: String): [HoneyHarvest]

  }

  type Mutation {
    killBee(
      id: String ,
    ): String,
    purgeSwarm(
      id: String,
    ): [Bee]

  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

export default Schema;
