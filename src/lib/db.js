import Sequelize from 'sequelize'
import fs from 'fs-extra'
import associations from './associations'
import modelHooks from './modelHooks'
import Environment from 'dotenv'

// get the ENV variables
Environment.config({ path: `${__dirname}/../../.env` })

if (!global.db) {
  // setup the db connection
  let db = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false
  })

  // read the model paths
  let modelPaths = fs.readdirSync(`${__dirname}/../models`).filter(path => path.endsWith('js'))

  // import the models
  modelPaths.map(model => db.import(`${__dirname}/../models/${model}`))

  // create the associations
  associations(db.models)

  // create the hooks
  modelHooks(db.models)

  // go ahead and make it globally available as a singleton
  global.db = db
}

export default global.db
