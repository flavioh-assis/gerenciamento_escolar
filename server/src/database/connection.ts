import 'dotenv/config';
import knex from 'knex';
import knexConfig = require('../../knexfile');

const db = knex({
  ...knexConfig,
});

export default db;
