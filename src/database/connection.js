const knex = require("knex");
const path= require('path')

const configPath = path.resolve(__dirname, '..', 'knexfile.js')

const configuration = require('../../knexfile');

const config = configuration.development

const connection = knex(config);

module.exports = connection;