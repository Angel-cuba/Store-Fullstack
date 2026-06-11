import { Request, Response, NextFunction } from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'

export const handleValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export const signUpRules: ValidationChain[] = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('lastname').trim().notEmpty().withMessage('Lastname is required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
]

export const signInRules: ValidationChain[] = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
]

export const productRules: ValidationChain[] = [
  body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('description')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Description must be at least 3 characters'),
  body('image').trim().isURL().withMessage('Image must be a valid URL'),
  body('category')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Category must be at least 3 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
]

export const orderRules: ValidationChain[] = [
  body('products')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one product'),
  body('products.*').isMongoId().withMessage('Each product must be a valid ID'),
]
