import Sequelize from 'sequelize'
import dbConfig from '../config/database'

import Plan from '../app/models/Plan'
import Student from '../app/models/Student'
import User from '../app/models/User'

const models = [Plan, User, Student]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(dbConfig)

    models.map(model => model.init(this.connection))
  }
}

export default new Database()
