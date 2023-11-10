import { Request, Response, NextFunction } from 'express'
import Order from '../models/Order'
import userService from '../services/user'

export const allUsersFromDatabase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await userService.getAllUsers()
    res.status(200).send(data)
  } catch (error) {
    res.status(404).send(error)
  }
}

export const getUsersHistoryOfProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find().populate('products').populate('user')
    res.json(orders)
  } catch (error) {
    res.status(400).send(error)
  }
}
