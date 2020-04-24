const knex = require("knex");

const configOptions = require("../knexfile.js").development;

// change to "production" and update knexfile.js to use postgres.

module.exports = knex(configOptions);
