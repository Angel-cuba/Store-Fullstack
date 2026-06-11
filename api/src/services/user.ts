import User, { UserInterface } from '../models/User'
import { PaginatedResult } from './product'

const createUser = async (user: UserInterface): Promise<UserInterface> => {
  return user.save()
}

const getUserById = async (id: string): Promise<UserInterface | null> => {
  return User.findById(id)
}

const getUserByEmail = async (email: string): Promise<UserInterface | null> => {
  return User.findOne({ email })
}

const updateAnUser = async (
  id: string,
  user: UserInterface
): Promise<UserInterface | null> => {
  return User.findByIdAndUpdate(id, user)
}

const deleteAnUser = async (id: string): Promise<UserInterface | null> => {
  return User.findByIdAndDelete(id)
}

const getAllUsers = async (
  page: number,
  limit: number
): Promise<PaginatedResult<UserInterface>> => {
  const skip = (page - 1) * limit
  const [data, total] = await Promise.all([
    User.find({ role: 'USER' }).skip(skip).limit(limit),
    User.countDocuments({ role: 'USER' }),
  ])
  return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
}

export default {
  createUser,
  getUserById,
  getUserByEmail,
  updateAnUser,
  deleteAnUser,
  getAllUsers,
}
