// @ts-ignore
import GoogleStrategy from 'passport-google-id-token'
import User, { UserInterface } from '../models/User'
import userService from '../services/user'

const loginWithGoogle = () => {
  return new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (parsedToken: any, googleId: any, done: any) => {
      //check if user exists
      let user = await userService.getUserByEmail(parsedToken.payload.email)
      //id doesn't exist, create new user'
      if (!user) {
        user = {
          name: parsedToken.payload.given_name,
          lastname: parsedToken.payload.family_name,
          picture: parsedToken.payload.picture,
          email: parsedToken.payload.email,
        } as UserInterface

        const newUser = new User(user)
        await userService.createUser(newUser)
      }
      done(null, user)
    }
  )
}

export default loginWithGoogle
