import { model, Schema, Document } from 'mongoose'

export interface UserInterface extends Document {
  name: string
  lastname: string
  picture: string
  email: string
  role: string
  band: boolean
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    // minlength: [3, "Name must be at least 3 characters long"],
    // maxlength: [30, "Name must be at most 30 characters long"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required'],
    // minlength: [3, "Name must be at least 3 characters long"],
    // maxlength: [30, "Name must be at most 30 characters long"],
    trim: true,
  },
  picture: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
    trim: true,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  ban: {
    type: Boolean,
    default: false,
  },
})

// userSchema.pre<IUser>("save", async function (next) {
//     if (!this.isModified("password")) {
//         return next();
//     }
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

export default model<UserInterface>('User', userSchema)
