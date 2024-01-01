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

router.get('/:id', verifyAuth, getAnUser)
router.put('/:id', verifyAuth, updateAnUser)
router.delete('/:id', verifyAuth, deletingUser)

//Login user
router.post(
  '/signin',
  // passport.authenticate('google-id-token', { session: false }),
  login
)
router.post('/signup', signUp)

//Register user

export default router
