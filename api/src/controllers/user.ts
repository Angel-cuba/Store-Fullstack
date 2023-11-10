import { Request, Response, NextFunction } from 'express'
import User, { UserInterface } from '../models/User'
import userService from '../services/user'
import jwt from 'jsonwebtoken'
import keys from '../config/keys'

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, lastname, picture, email, role } = req.body

  const user = new User({
    name,
    lastname,
    picture,
    email,
    role,
  })
  try {
    await userService.createUser(user)
    res.status(200).json(user)
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
  const user = req.user as any

  const token = jwt.sign(
    {
      picture: user.picture,
      email: user.email,
      role: user.role,
      name: user.name,
      id: user._id,
    },
    keys.PRIVATE_KEY as string,
    { expiresIn: '1h' }
  )
  res.json({ token })
}
