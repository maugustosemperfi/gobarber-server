import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import Appointment from '../app/models/Appointment';
import File from '../app/models/File';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => {
        model.init(this.connection);

        return model;
      })
      .map(model => {
        model.associate && model.associate(this.connection.models);
        return model;
      });
  }

  mongo() {
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/gobarber', { useNewUrlParser: true, useFindAndModify: true });
  }
}

export default new Database();
