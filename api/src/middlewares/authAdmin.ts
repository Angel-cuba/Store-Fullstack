import { NextFunction, Request, Response } from 'express'
import User from '../models/User'

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.headers.user } as any)
    if (user) {
      if (user.role === 'ADMIN') {
        next()
      } else {
        res.status(401).json({
          message: 'You are not authorized to access this route',
        })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}
