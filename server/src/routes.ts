import express from 'express';

import AlunosController from './controllers/AlunosController';
import ClassesController from './controllers/ClassesController';

const routes = express.Router();

const alunosController = new AlunosController();
const classesController = new ClassesController();

routes.get('/classes', classesController.index);
routes.get('/classes/available', classesController.available);
routes.post('/classes', classesController.create);
routes.put('/classes/:id', classesController.update);
routes.delete('/classes/:id', classesController.delete);

routes.get('/alunos', alunosController.index);
routes.get('/alunos/:id', alunosController.id);
routes.post('/alunos', alunosController.create);

export default routes;
