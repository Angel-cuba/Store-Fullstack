import { Router } from 'express'
import verifyAuth from '../middlewares/authorization'
import { isAdmin } from '../middlewares/authAdmin'
import { productRules, handleValidation } from '../middlewares/validate'
import {
  allProducts,
  createProduct,
  deleteProduct,
  getProduct,
  getProductsBySearch,
  updateProduct,
} from '../controllers/products'

const router = Router()

router.get('/all', allProducts)
router.get('/search', getProductsBySearch)
router.post(
  '/',
  verifyAuth,
  isAdmin,
  productRules,
  handleValidation,
  createProduct
)
router.get('/:id', getProduct)
router.put(
  '/:id',
  verifyAuth,
  isAdmin,
  productRules,
  handleValidation,
  updateProduct
)
router.delete('/:id', verifyAuth, isAdmin, deleteProduct)

export default router
