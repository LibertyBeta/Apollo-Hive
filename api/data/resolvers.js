const Resolvers = {
  Query: {
    hives(_, args, context) {
      return context.connectors.HiveConnector.all();
    },
    hive(_, args, context) {
      console.log("HIVE?",args);
      if(!args.id) console.log("Wufl");
      return context.connectors.HiveConnector.single(args.id);
    },
    queen(_, args, context){
      console.log("QUEEN!", args);
      if(!args.id) console.log("qulf");
      return context.connectors.BeeConnector.singleQueen(args.id);
    },
    swarm(_,args,context){
      return context.connectors.HiveConnector.single(args.id);
    },
    harvests(_,args,context){
      return context.connectors.HoneyHarvestConnector.hiveHarvests(args.id);
    }

  },


  Mutation: {
    killBee(_, args, context){
      return context.connectors.BeeConnector.removeBee(args.id);
    },
    purgeSwarm(_, args, context){
      return context.connectors.BeeConnector.purge(args.id);
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
    location: (_, args, context)=>{
      return _;
    },
    bees: (_, args, context) =>{
      return context.connectors.BeeConnector.swarm(_.id);
    },
    queen: (_, args, context) =>{
      return context.connectors.BeeConnector.queen(_.id);
    },
    weather: (_, args, context)=>{
      return context.connectors.HiveConnector.weather(_.id, _.lat, _.lng);
    }
  },

  HoneyHarvest: {
    id:(_, args, context)=>_.id,
    customer:(_, args, context)=>_.Name,
    collectedOn:(_, args, context)=>_.CollectedOn,
    amount:(_, args, context)=> _.Amount,
    quality:(_, args, context)=> { return _.Quality},
  },


  QueenBee: {
    id:(_, args, context)=> _._id,
    inceptDate:(_, args, context)=>new Date(_.inceptDate),
    qualtiy:(_, args, context)=>_.quality,
    notes: (_, args, context)=>{
      return _.notes
    }
  },

  Bee: {
    id:(_, args, context)=>{return _._id},
    inceptDate:(_, args, context)=>{return new Date(_.inceptDate)},
    producing:(_, args, context)=>_.producing,
  },


  Swarm: {
    queen: (_,args,context)=> context.connectors.BeeConnector.hiveQueen(_.id),
    bees: (_, args, context)=> context.connectors.BeeConnector.swarm(_.id),
  },

  HiveLocation: {
    lat: (_, args, context) => _.lat,
    lng: (_, args, context) => _.lng
  },

  Weather: {
    condition: (_, args, context)=> _.summary,
    temperature: (_, args, context)=> _.temperature,
    coniditonString: (_, args, context)=>_.icon,
    wind: (_, args, context)=>_.windSpeed,
  }


};

export default Resolvers;
