import mongoose from 'mongoose'
const Schema = mongoose.Schema

const InfoSchema = new Schema(
  {
    name: String
  },
  {
    versionKey: false
  }
)

const Info = mongoose.model('info', InfoSchema, 'info')

export { Info }
