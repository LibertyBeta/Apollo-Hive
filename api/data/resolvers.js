const Resolvers = {
  Query: {
    hives(_, args, context) {
      return context.Shipments.all();
    },
    hive(_, args, context) {
      return context.Shipments.single(args.id);
    },

  },


  Mutation: {
    killBee(_, args, context){
      return false;
    }
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

export default [Resolvers]
