import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ForbiddenError } from '../helpers/apiError'
import keys from '../config/keys'
import userService from '../services/user'

export default async function verifyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization || ''
  try {
    const token = auth.split(' ')[1]
    const PRIVATE_KEY = keys.PRIVATE_KEY as string

    const decodedUser = jwt.verify(token, PRIVATE_KEY)
    const { email } = decodedUser as { email: string }
    const fullUser = await userService.getUserByEmail(email)

    if (!fullUser) {
      throw new ForbiddenError()
    }

    req.currentUser = fullUser
    next()
  } catch (error) {
    throw new ForbiddenError()
  }
}
