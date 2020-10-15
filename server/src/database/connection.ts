import knex from 'knex'

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'db_mvmi',
    user : 'postgres',
    password : 'postgres',
  }
  // connection: process.env.PG_CONNECTION_STRING,
  // searchPath: ['knex', 'public'],
})

export default db