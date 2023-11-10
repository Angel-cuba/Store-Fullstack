import { Router } from 'express'
import {
  userBuyProducts,
  getUserHistoryOfProducts,
} from '../controllers/orders'
import verifyAuth from '../middlewares/authorization'
const router = Router()

//Posting sales
router.post('/create', verifyAuth, userBuyProducts)

//History method
router.get('/user', verifyAuth, getUserHistoryOfProducts)

export default router
