const knex = require('knex')

const config = require('../knexfile');

const env = process.env.NODE_ENV || 'development'
const knexConfig = config[env];

module.exports = knex(knexConfig);
