import mongoose from 'mongoose'
const Schema = mongoose.Schema

const GachasSchema = new Schema(
  {
    id: Number,
    category: Number,
    caution: String,
    description: String,
    started_at: Date,
    ended_at: Date,
    name: String,
    translation: Object
  },
  {
    versionKey: false
  }
)

const Gachas = mongoose.model('gachas', GachasSchema)

export { Gachas }