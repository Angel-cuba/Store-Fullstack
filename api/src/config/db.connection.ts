import mongoose, { ConnectOptions } from 'mongoose'
import keys from './keys'

type ConnectionOptions = {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(keys.db_URI, dbOptions as ConnectOptions)

const connection = mongoose.connection

connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

connection.on('error', (err) => {
  console.log('Connection error: ' + err)
  process.exit(-1)
})
