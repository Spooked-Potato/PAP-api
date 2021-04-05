/**
 * Arquivo de conexão entre os controllers e a BD
 */

const knex = require("knex");

const configuration = require('../../knexfile');

const config = configuration.development

const connection = knex(config);

module.exports = connection;