import { model, Schema, Document } from 'mongoose'
import { IProduct } from '../types/product.type'

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters long'],
    // maxlength: [30, "Title must be at most 30 characters long"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [3, 'Description must be at least 3 characters long'],
    // maxlength: [300, "Description must be at most 30 characters long"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    minlength: [3, 'Image must be at least 3 characters long'],
    // maxlength: [30, "Image must be at most 30 characters long"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    minlength: [3, 'Category must be at least 3 characters long'],
    // maxlength: [30, "Category must be at most 30 characters long"],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating must be at least 0'],
    // max: [1000000000, "Rating must be at most 1000000000"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be at least 0'],
    // max: [10000000000, "Price must be at most 10000000000"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default model<IProduct>('Product', productSchema)
