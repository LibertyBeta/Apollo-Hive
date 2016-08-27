'use strict';

// const ShipmentMock = require('./models/mocks').Shipment;
// const ProducttMock = require('./models/mocks').Product;

const schema = [`
  type Hive {
    id: String !,
    name: String !

    lastCollection: Date,
    collections: [HoneyCollection]
    queenBee: [QueenBee],
    swarm: [Swarm]
  }

  type HoneyCollection {
    collectedOn: Date !,
    amount: Float !,
    quality: String !,
  }

  type Hive {
    id: String !,
    name: String !

    lastCollection: [HoneyCollection],
    queenBee: [QueenBee],
    swarm: [Swarm]
  }

  type QueenBeen {
    id: String !,
    insceptDate: Date !,
    qualtiy: String !,
    notes: Array !
  }

  type Bee {
    id: String !,
    inceptDate: Date !,
    producing: Boolean !,
  }


  type Swarm {
    bees: [Bee]
  }



  type Query {
    # hives
    hives: [Hive]
    hive (id: String!): Hive


  }

  type Mutation {

  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

const resolvers = {
  Query: {
    hives(_, args, context) {
      return context.Shipments.all();
    },
    hive(_, args, context) {
      return context.Shipments.single(args.id);
    },

  },
  Mutation: {

  },
  Hive: {
    id: (_, args, context) => context.Hive.id(_.id),
    name: (_, args, context) => context.Hive.name(_.name),
    lastCollection: (_, args, context) => context.Hive.getHoneycollection().then(honey=>{return honey.collectedOn;}),
    queenBee: (_, args, context) =>{
      return new Promise((resolve, reject) => {
        setTimeout( () => reject('MongoDB timeout when fetching field views (timeout is 500ms)'), 500);
        Queens.findOne({ hive: context.Hive.id }).then( (res) => resolve(res.queens) );
      })
    },
    swarm: (_, args, context) =>{
      return new Promise((resolve, reject) => {
        setTimeout( () => reject('MongoDB timeout when fetching field views (timeout is 500ms)'), 500);
        Bees.find({ hive: context.Hive.id }).then( (res) => resolve(res.Bees) );
      })
    },
  },
  Shipment: {
    origin: (_, args, context) => context.Shipments.origin(_.origin),
    destination: (_, args, context) => context.Shipments.destination(_.destination),
    currentLocation: (_, args, context) => context.Shipments.currentLocation(_.currentLocation),
    inventory: (_, args, context) => context.Products.of(_.id),
  },
  Product: {
    costToManufacture: property('cost_to_manufacture'),
    retailPrice: property('retail_price'),
  },
  Posts: {
    title :(_,args,context)=>{'bob'}
  }
};

module.exports = {
  schema,
  resolvers
};

function property(key) {
  return (o) => o[key];
}
