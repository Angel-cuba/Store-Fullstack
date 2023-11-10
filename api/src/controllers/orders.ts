import { Request, Response, NextFunction } from 'express'
import Order from '../models/Order'

export const userBuyProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = new Order({
      products: req.body.products,
      user: req.body.user,
    })
    order.save()
    res.json(order)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const getUserHistoryOfProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as any
  const userId = user.decodedUser.id
  try {
    const orders = await Order.find({ user: userId })
      .populate('products')
      .populate('user')
    res.json(orders)
  } catch (error) {
    res.status(400).send(error)
  }
}
