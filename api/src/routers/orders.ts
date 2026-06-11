import { Router } from 'express'
import {
  createPaymentIntent,
  userBuyProducts,
  getUserHistoryOfProducts,
  updateOrderStatus,
} from '../controllers/orders'
import verifyAuth from '../middlewares/authorization'
import { isAdmin } from '../middlewares/authAdmin'
import { orderRules, handleValidation } from '../middlewares/validate'

const router = Router()

router.post('/payment-intent', verifyAuth, createPaymentIntent)
router.post(
  '/create',
  verifyAuth,
  orderRules,
  handleValidation,
  userBuyProducts
)
router.get('/user', verifyAuth, getUserHistoryOfProducts)
router.patch('/:id/status', verifyAuth, isAdmin, updateOrderStatus)

export default router
