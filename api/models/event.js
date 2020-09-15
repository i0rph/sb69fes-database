import mongoose from 'mongoose'
const Schema = mongoose.Schema

const EventsSchema = new Schema(
  {
    id: Number,
    name: String,
    category_name: String,
    is_point_reward: Boolean,
    is_story: Boolean,
    play_ended_at: Date,
    play_started_at: Date,
    translation: Object
  },
  {
    versionKey: false
  }
)

const EventMyumonsSchema = new Schema(
  {
    id: Number,
    args: String,
    category: Number,
    event_id: Number,
    myumon_id: Number
  },
  {
    versionKey: false
  }
)

const Events = mongoose.model('events', EventsSchema)
const EventMyumons = mongoose.model('event_myumons', EventMyumonsSchema)

export { Events, EventMyumons }
