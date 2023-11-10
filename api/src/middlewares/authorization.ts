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
    // console.log('decodedUser',decodedUser)
    //If i want to send more info from user
    const { email } = decodedUser as { email: string }
    const fullUser = await userService.getUserByEmail(email)

    //Missing data in decodedUser to send to the frontend
    // const dataOfUser = {
    //   name: fullUser?.name,
    //   picture: fullUser?.picture,
    //   role: fullUser?.role,
    // }
    req.user = { decodedUser }
    next()
  } catch (error) {
    console.log('error', error)
    throw new ForbiddenError()
  }
}
