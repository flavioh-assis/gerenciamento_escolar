import express from 'express'

const app = express()

app.use(express.json())

// GET: buscar ou listar alguma informaçao
// POST: criar uma informaçao
// PUT: atualizar uma informçao
// DELETE: deletetar uma informaçao

// Corpo (request body): dados para cração/atualizaçao de um registro
// Route Params: identificar qual recurso eu quero atualizar/deletar
// Query Params: paginaçao, filtro, ordenaçao

app.get('/', (req, res) => {
  // return res.json({message: 'Hell world'})
  res.status(200).send('Hell world')
})

app.listen(3333)

// const classe = [
//   {ano: '1º', turma: 'A', periodo: 'Manhã', sala: '06', professor: 'Adriana Bonavena'},
//   {ano: '1º', turma: 'B', periodo: 'Tarde', sala: '06', professor: 'Ricardo'},
// ]
