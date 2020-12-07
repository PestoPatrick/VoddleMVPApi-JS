const pgp = require('pg-promise')();

const db = pgp("postgres://postgres:PLIB-zer4doss!ghug@voddlemvp-main.ctxryicyfivp.eu-west-2.rds.amazonaws.com:5432/voddlemvp" )

module.exports = db
