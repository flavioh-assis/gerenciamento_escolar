import path from 'path'

module.exports = {
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'db_mvmi',
    user : 'postgres',
    password : 'postgres',
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  }
}
