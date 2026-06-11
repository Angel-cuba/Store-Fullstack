import { NextFunction, Request, Response } from 'express'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.currentUser?.role === 'ADMIN') {
    next()
  } else {
    res
      .status(403)
      .json({ message: 'You are not authorized to access this route' })
  }
}
