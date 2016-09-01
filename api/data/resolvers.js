const Resolvers = {
  Query: {
    hives(_, args, context) {
      return context.connectors.HiveConnector.all();
    },
    hive(_, args, context) {
      console.log("HIVE?",args);
      return context.connectors.HiveConnector.single(args.id);
    },

  },


  Mutation: {
    killBee(_, args, context){

      return context.connectors.BeeConnector.remove(args.id);
    },
    purgeSwarm(_, args, context){
      return context.connectors.BeeConnector.purge(args.hiveId);
    }
  },


  Hive: {
    id: (_, args, context) => _.id,
    name: (_, args, context) => _.Name,
    lastCollection: (_, args, context) => context.connectors.HiveConnector.getLastHarvest(_.id),
    harvests: (_, args, context) => {
      let flat = [];
      for(let harvest of _.honeyharvests){
        flat.push(harvest.get());
      }
      return flat;
    },
    bees: (_, args, context) =>{
      return context.connectors.BeeConnector.swarm(_.id);
    },
    queen: (_, args, context) =>{
      return context.connectors.BeeConnector.queen(_.id);
    },
  },

  HoneyHarvest: {
    collectedOn:(_, args, context)=>_.CollectedOn,
    amount:(_, args, context)=> _.Amount,
    quality:(_, args, context)=> _.Quality,
  },


  QueenBee: {
    id:(_, args, context)=>_._id,
    insceptDate:(_, args, context)=>new Date(_.inceptDate),
    qualtiy:(_, args, context)=>_.quality,
    notes: (_, args, context)=>_.notes,
  },

  Bee: {
    id:(_, args, context)=>{console.log("Hello");return _._id},
    inceptDate:(_, args, context)=>{return new Date(_.inceptDate)},
    producing:(_, args, context)=>_.producing,
  },


  Swarm: {
    bees: (_, args, context)=>{return context.connectors.BeeConnector.swarm(args.id);},
  },


};

export default Resolvers;
