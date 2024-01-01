import { Request, Response, NextFunction } from 'express'
import User, { UserInterface } from '../models/User'
import userService from '../services/user'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import keys from '../config/keys'

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, lastname, picture, email, password, role } = req.body

  const existingUser = await userService.getUserByEmail(email)
  // Check if user exists
  if (existingUser) {
    return res
      .status(400)
      .json({ message: `User with email ${email} exists already` })
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  // Create an user instance
  const user = new User({
    name,
    lastname,
    picture,
    email,
    password: hashedPassword,
    role: role || 'USER',
    band: false,
  })
  try {
    await userService.createUser(user)
    const token = jwt.sign(
      {
        email,
      },
      keys.PRIVATE_KEY as string,
      { expiresIn: '1h' }
    )
    const { name, role } = user
    res.status(200).json({ token, user: { name, role } })
  } catch (err) {
    res.status(404).send(err)
  }
}
export const getAnUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const user = await userService.getUserById(id)
    res.status(200).json(user)
  } catch (err) {
    res.status(404).send(err)
  }
}
export const updateAnUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const user = await userService.updateAnUser(id, req.body)
    res.status(200).json(user)
  } catch (err) {
    res.status(404).send(err)
  }
}

export const deletingUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const user = await userService.deleteAnUser(id)
    res.status(200).json({ message: `User ${user?.name} deleted` })
  } catch (err) {
    res.status(404).send(err)
  }
}

//Login and  token verification
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  // Check if user exists
  const user = await userService.getUserByEmail(email)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  // Check password
  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return res.status(400).json({ message: 'Invalid password' })
  }

  // Create token
  const token = jwt.sign(
    {
      email,
    },
    keys.PRIVATE_KEY as string,
    { expiresIn: '1h' }
  )
  // Return token and user data
  res.json({ token, user: { name: user.name, role: user.role } })
}
