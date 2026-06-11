import { Request, Response, NextFunction } from 'express'
import Product from '../models/Product'
import productService from '../services/product'

export const allProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const limit = Math.min(
    100,
    Math.max(1, parseInt(req.query.limit as string) || 20)
  )
  try {
    res.json(await productService.getAll(page, limit))
  } catch (error) {
    res.status(404).send(error)
  }
}
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.getOne(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).send(`Product with id: ${req.params.id} not found`)
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

export const getProductsBySearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  type Query = {
    name: string
    category: string
  }
  const { name, category } = req.query as Query

  try {
    if (name && category) {
      const products = await productService.getProductsByMultiMatch([
        {
          $match: { category },
        },
        {
          $match: { name },
        },
      ])
      return res.json(products)
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, description, image, category, rating } = req.body
  const product = new Product({
    name,
    description,
    image,
    category,
    rating,
    price,
  })

  try {
    await productService.create(product)
    res.status(200).json(product)
  } catch (err) {
    res.status(404).send(err)
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.updateProd(req.params.id, req.body))
  } catch (error) {
    res.status(404).send(error)
  }
}

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await productService.deleteProd(req.params.id)
    res.status(200).json({ message: 'Product deleted' })
  } catch (error) {
    res.status(404).send(error)
  }
}
