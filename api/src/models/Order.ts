import { model, Schema, Document, Types } from 'mongoose'

export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderInterface extends Document {
  products: Types.ObjectId[]
  user: Types.ObjectId
  status: OrderStatus
  createdAt: Date
  shippingAddress?: string
}

const orderSchema = new Schema({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  shippingAddress: {
    type: String,
  },
})

export default model<OrderInterface>('Order', orderSchema)
