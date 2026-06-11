import { Request, Response, NextFunction } from 'express'
import Stripe from 'stripe'
import Order, { OrderStatus } from '../models/Order'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const VALID_STATUSES: OrderStatus[] = [
  'pending',
  'shipped',
  'delivered',
  'cancelled',
]

export const createPaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount } = req.body as { amount: number }
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' })
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // cents
      currency: 'eur',
      // eslint-disable-next-line @typescript-eslint/camelcase
      automatic_payment_methods: { enabled: true },
    })
    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.status(500).send(error)
  }
}

export const userBuyProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = new Order({
      products: req.body.products,
      user: req.currentUser!._id,
      shippingAddress: req.body.shippingAddress,
    })
    await order.save()
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
  try {
    const orders = await Order.find({ user: req.currentUser!._id })
      .populate('products')
      .populate('user')
    res.json(orders)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { status } = req.body as { status: OrderStatus }

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
    })
  }

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
      .populate('products')
      .populate('user')

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json(order)
  } catch (error) {
    res.status(400).send(error)
  }
}
