import express from 'express'
import routes from './routes'

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*",);
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS',);
  next();
});
app.use(express.json())
app.use(routes)

app.listen(3333)

// GET: buscar ou listar alguma informaçao
// POST: criar uma informaçao
// PUT: atualizar uma informçao
// DELETE: deletetar uma informaçao

// Corpo (request body): dados para cração/atualizaçao de um registro
// Route Params: identificar qual recurso eu quero atualizar/deletar
// Query Params: paginaçao, filtro, ordenaçao
