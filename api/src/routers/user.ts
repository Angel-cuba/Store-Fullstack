import { Router } from 'express'
import passport from 'passport'
import rateLimit from 'express-rate-limit'
import verifyAuth from '../middlewares/authorization'
import {
  signUpRules,
  signInRules,
  handleValidation,
} from '../middlewares/validate'
import {
  signUp,
  deletingUser,
  getAnUser,
  updateAnUser,
  login,
  googleSignIn,
} from '../controllers/user'

const router = Router()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many attempts, please try again in 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
})

router.get('/:id', verifyAuth, getAnUser)
router.put('/:id', verifyAuth, updateAnUser)
router.delete('/:id', verifyAuth, deletingUser)

router.post('/signin', authLimiter, signInRules, handleValidation, login)
router.post('/signup', authLimiter, signUpRules, handleValidation, signUp)
router.post(
  '/google-signin',
  passport.authenticate('google-id-token', { session: false }),
  googleSignIn
)

export default router
