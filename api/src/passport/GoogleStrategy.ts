// @ts-ignore
import GoogleStrategy from 'passport-google-id-token'
import User, { UserInterface } from '../models/User'
import userService from '../services/user'

interface GoogleTokenPayload {
  email: string
  given_name: string
  family_name: string
  picture: string
  sub: string
}

interface ParsedGoogleToken {
  payload: GoogleTokenPayload
}

type PassportDone = (err: Error | null, user?: UserInterface | false) => void

const loginWithGoogle = () => {
  return new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (
      parsedToken: ParsedGoogleToken,
      _googleId: string,
      done: PassportDone
    ) => {
      //check if user exists
      let user = await userService.getUserByEmail(parsedToken.payload.email)
      //id doesn't exist, create new user'
      if (!user) {
        const newUser = new User({
          name: parsedToken.payload.given_name,
          lastname: parsedToken.payload.family_name,
          picture: parsedToken.payload.picture,
          email: parsedToken.payload.email,
          password: `google_${parsedToken.payload.sub}`,
        })
        user = await userService.createUser(newUser)
      }
      done(null, user)
    }
  )
}

export default loginWithGoogle
