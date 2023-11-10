import { model, Schema, Document } from 'mongoose'

export interface OrderInterface extends Document {
  name: string
  lastname: string
  picture: string
  email: string
  role: string
  band: boolean
}

const orderSchema = new Schema({
  // one to many relation -> one Order to Many products
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  // one to one relation -> one Order to One user
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
