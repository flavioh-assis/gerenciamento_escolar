import express from 'express'

import AlunosController from './controllers/AlunosController'
import ClassesController from './controllers/ClassesController'

const routes = express.Router()

const alunosController = new AlunosController()
const classesController = new ClassesController()

routes.get('/classes', classesController.index)
routes.get('/classes/disp', classesController.disp)
routes.post('/classes', classesController.create)
routes.delete('/classes', classesController.delete)
routes.put('/classes', classesController.update)

routes.get('/alunos', alunosController.index)
routes.get('/alunos_rm', alunosController.rm)
routes.post('/alunos', alunosController.create)

export default routes
