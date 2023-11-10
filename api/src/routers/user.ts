import { Router } from 'express'
import passport from 'passport'
import verifyAuth from '../middlewares/authorization'
import {
  signUp,
  deletingUser,
  getAnUser,
  updateAnUser,
  login,
} from '../controllers/user'
const router = Router()

router.post('/signup', signUp)
router.get('/:id', verifyAuth, getAnUser)
router.put('/:id', verifyAuth, updateAnUser)
router.delete('/:id', verifyAuth, deletingUser)

//Login user
router.post(
  '/signin-google',
  passport.authenticate('google-id-token', { session: false }),
  login
)

export default router
