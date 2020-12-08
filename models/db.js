const pgp = require('pg-promise')();

const db = pgp(process.env.DB )

module.exports = db
