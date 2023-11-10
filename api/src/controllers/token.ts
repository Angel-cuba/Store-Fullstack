import { Request, Response } from 'express'

export const verifyToken = (req: Request, res: Response) => {
  console.log('verifyAuth', req.user)
  res.json({
    status: 200,
    isVerified: true,
    user: req.user,
  })
}
