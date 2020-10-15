import express from 'express'
import AlunosController from './controllers/AlunosController'
import ClassesController from './controllers/ClassesController'

const routes  = express.Router()
const alunosController = new AlunosController()
const classesController = new ClassesController()

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

routes.get('/alunos', alunosController.index)
routes.post('/alunos', alunosController.create)

export default routes
