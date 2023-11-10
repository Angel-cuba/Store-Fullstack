import { Router } from 'express'
import {
  allUsersFromDatabase,
  getUsersHistoryOfProducts,
} from '../controllers/admin'
import { isAdmin } from '../middlewares/authAdmin'
const router = Router()

router.get('/allusers', isAdmin, allUsersFromDatabase)
router.get('/allhistories', isAdmin, getUsersHistoryOfProducts)

export default router
