import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ComicsSchema = new Schema(
  {
    id: Number,
    asset_id: Number,
    sort_order: Number,
    name: String,
    translation: Object
  },
  {
    versionKey: false
  }
)

const Comics = mongoose.model('comics', ComicsSchema)

export { Comics }