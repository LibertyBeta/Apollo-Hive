const Resolvers = {
  Query: {
    hives(_, args, context) {
      return context.connectors.HiveConnector.all().then(data=>{
        console.log(data);
        return data;
      })

    },
    hive(_, args, context) {
      return context.HiveConnector.single(args.id);
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

  },

  HoneyCollection: {
    collectedOn:(_, args, context)=>{return null},
    amount:(_, args, context)=>{return null},
    quality:(_, args, context)=>{return null},
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
