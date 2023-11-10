import { Router } from 'express'
import verifyAuth from '../middlewares/authorization'
import { verifyToken } from '../controllers/token'

const router = Router()

//Verify user token
router.post('/verify', verifyAuth, verifyToken)

export default router
