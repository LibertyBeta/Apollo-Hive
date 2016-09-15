import Sequelize from 'sequelize';

const db = new Sequelize('hives', null, null, {
  dialect: 'sqlite',
  storage: './hives.sqlite',
  logging: false,
});

//SQL
const HiveModel = db.define('hive', {
  Name: {
    type: Sequelize.STRING,
  },
  lat: {
    type: Sequelize.FLOAT,
  },
  lng: {
    type: Sequelize.FLOAT,
  }
});

const HoneyHarvestModel = db.define('honeyharvest', {
  CollectedOn: {
    type: Sequelize.DATE
  },
  Amount: {
    type: Sequelize.FLOAT,
  },
  Quality: {
    type: Sequelize.STRING(1)
  }
});

const CustomersModel = db.define('customer', {
  Name: {
    type: Sequelize.STRING
  },
  Address: {
    type: Sequelize.STRING
  }
});

HiveModel.hasMany(HoneyHarvestModel);
HoneyHarvestModel.belongsTo(HiveModel);

CustomersModel.hasMany(HoneyHarvestModel);

export {db, HiveModel, HoneyHarvestModel, CustomersModel }
