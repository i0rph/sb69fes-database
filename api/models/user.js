import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String
    },
    username: {
      type: String,
      require: true
    },
    role: {
      type: Array,
      required: true,
      default: []
    },
    oAuth: {
      google: {
        type: Number,
        default: null
      },
      twitter: {
        type: Number,
        default: null
      }
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  {
    versionKey: false
  }
)

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  bcrypt.genSalt(12, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next(err)
    next(null, isMatch)
  })
}

const User = mongoose.model('credentials', UserSchema)

export { User }