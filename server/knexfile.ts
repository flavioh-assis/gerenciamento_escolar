import 'dotenv/config';
import path from 'path';

const knexConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_URL,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
};

module.exports = knexConfig;
