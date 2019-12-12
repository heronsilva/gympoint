import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'
import adminMiddleware from './app/middlewares/admin'

import PlanController from './app/controllers/PlanController'
import SessionController from './app/controllers/SessionController'
import StudentController from './app/controllers/StudentController'

const router = new Router()

router.post('/sessions', SessionController.store)

router.use(authMiddleware)

router.post('/students', adminMiddleware, StudentController.store)
router.put('/students/:student_id', adminMiddleware, StudentController.update)

router.get('/plans', adminMiddleware, PlanController.index)
router.get('/plans/:plan_id', adminMiddleware, PlanController.show)
router.post('/plans', adminMiddleware, PlanController.store)
router.put('/plans/:plan_id', adminMiddleware, PlanController.update)
router.delete('/plans/:plan_id', adminMiddleware, PlanController.destroy)

export default router
