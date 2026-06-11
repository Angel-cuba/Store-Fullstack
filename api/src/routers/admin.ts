import { Router } from 'express'
import {
  allUsersFromDatabase,
  getUsersHistoryOfProducts,
  banUser,
} from '../controllers/admin'
import verifyAuth from '../middlewares/authorization'
import { isAdmin } from '../middlewares/authAdmin'

const router = Router()

router.get('/allusers', verifyAuth, isAdmin, allUsersFromDatabase)
router.get('/allhistories', verifyAuth, isAdmin, getUsersHistoryOfProducts)
router.patch('/users/:id/ban', verifyAuth, isAdmin, banUser)

export default router
