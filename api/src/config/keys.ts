import 'dotenv/config'

export default {
  db_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.lquq3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  PORT: process.env.PORT,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
}
