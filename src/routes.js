import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'
import adminMiddleware from './app/middlewares/admin'

import SessionController from './app/controllers/SessionController'
import StudentController from './app/controllers/StudentController'

const routes = new Router()

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.post('/students', adminMiddleware, StudentController.store)
routes.put('/students/:student_id', adminMiddleware, StudentController.update)

export default routes
