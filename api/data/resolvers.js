const Resolvers = {
  Query: {
    hives(_, args, context) {
      return context.connectors.HiveConnector.all();
    },
    hive(_, args, context) {
      console.log(args);
      return context.connectors.HiveConnector.single(args.id);
    },

  },


  Mutation: {
    killBee(_, args, context){
      return false;
    }
  },


  Hive: {
    id: (_, args, context) => _.id,
    name: (_, args, context) => _.Name,
    lastCollection: (_, args, context) => context.Hive.getHoneycollection().then(honey=>{return honey.collectedOn;}),
    harvests: (_, ars, context) => {
      let flat = [];
      for(let result of _.honeyharvests){
        flat.push(result.get());
      }
      return flat;
    }
  },

  HoneyHarvest: {
    collectedOn:(_, args, context)=>_.CollectedOn,
    amount:(_, args, context)=> _.Amount,
    quality:(_, args, context)=> _.Quality,
  },


  QueenBee: {
    id:(_, args, context)=>{return null},
    insceptDate:(_, args, context)=>{return null},
    qualtiy:(_, args, context)=>{return null},
    notes: (_, args, context)=>{return null},
  },

  Bee: {
    id:(_, args, context)=>{return null},
    inceptDate:(_, args, context)=>{return null},
    producing:(_, args, context)=>{return null},
  },


  Swarm: {
    bees: (_, args, context)=>{return null},
  },


};

export default Resolvers;
