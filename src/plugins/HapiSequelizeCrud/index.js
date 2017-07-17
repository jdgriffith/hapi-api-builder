import HapiSequelize from 'hapi-sequelizejs'
import Sequelize from 'sequelize'
import associations from './../../lib/associations'
const HapiSequelizeCrud = require('hapi-sequelize-crud-extended')

exports.register = async function (server, options, next) {
  await server.register([{
    register: HapiSequelize,
    options: {
      name: 'db',
      models: [options.models.path],
      sequelize: new Sequelize(options.database.name, options.database.user, options.database.password, {
        host: options.database.host,
        dialect: options.database.dialect
      }),
      onConnect: db => {
        // set at a global level
        global.db = db

        // create associations
        associations(db.models)

        // create model hooks
        // modelHooks(db.models)
      }
    }
  }])

  await server.register([{
    register: HapiSequelizeCrud,
    options: {
      prefix: options.rest.prefix || '',
      name: 'db',
      defaultConfig: {},
      // TODO: this needs to be dynamic with allowed overrides
      models: options.models
    }
  }])

  next()
}

exports.register.attributes = {
  name: 'hapisequelizecrud',
  version: '1.0.0'
}
