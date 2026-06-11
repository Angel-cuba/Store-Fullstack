import { Request, Response, NextFunction } from 'express'
import Order from '../models/Order'
import User from '../models/User'
import userService from '../services/user'

export const allUsersFromDatabase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const limit = Math.min(
    100,
    Math.max(1, parseInt(req.query.limit as string) || 10)
  )
  try {
    const data = await userService.getAllUsers(page, limit)
    res.status(200).json(data)
  } catch (error) {
    res.status(404).send(error)
  }
}

export const banUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { ban } = req.body as { ban: boolean }

  if (typeof ban !== 'boolean') {
    return res.status(400).json({ message: '`ban` must be a boolean' })
  }

  try {
    const user = await User.findByIdAndUpdate(id, { ban }, { new: true })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({
      message: `User ${user.name} has been ${ban ? 'banned' : 'unbanned'}`,
      user,
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const getUsersHistoryOfProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const limit = Math.min(
    100,
    Math.max(1, parseInt(req.query.limit as string) || 10)
  )
  const skip = (page - 1) * limit
  try {
    const [data, total] = await Promise.all([
      Order.find()
        .populate('products')
        .populate('user')
        .skip(skip)
        .limit(limit),
      Order.countDocuments(),
    ])
    res.json({ data, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    res.status(400).send(error)
  }
}
