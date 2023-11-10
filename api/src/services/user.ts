import User, { UserInterface } from '../models/User'

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

const getAllUsers = async (): Promise<UserInterface[]> => {
  return User.find({ role: 'USER' })
}

export default {
  createUser,
  getUserById,
  getUserByEmail,
  updateAnUser,
  deleteAnUser,
  getAllUsers,
}
