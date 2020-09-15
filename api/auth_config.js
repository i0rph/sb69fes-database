require('dotenv').config()

const LocalStrategy = require('passport-local').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

import { User } from './models'

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err)
        if (!user) return done(null, false, { message: 'No such user' })
        user.comparePassword(password, (err, isMatch) => {
          if (err) return done(err)
          if (!isMatch) return done(null, false, { message: 'Incorrect password' })
          done(null, user)
        })
      })
    }
  ))
  
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
    includeEmail: true
  },
  async function(accessToken, refreshToken, profile, done) {
    const { _json: { id, name, email } } = profile
    try {
      const user = await User.findOne({ email: email })
      if (user) {
        if (user.oAuth.twitter) return done(null, user)
        user.oAuth.twitter = id
        user.save()
        return done(null, user)
      } else {
        const newUser = await User.create({
          email: email,
          username: name,
          oAuth: {
            google: null,
            twitter: id
          }
        })
        return done(null, newUser)
      }
    } catch (error) {
      return done(error)
    }
  }))
  
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    includeEmail: true
  },
  async function(accessToken, refreshToken, profile, done) {
    const { id, _json: { name, email } } = profile
    try {
      const user = await User.findOne({ email: email })
      if (user) {
        if (user.oAuth.google) return done(null, user)
        user.oAuth.google = id
        user.save()
        return done(null, user)
      } else {
        const newUser = await User.create({
          email: email,
          username: name,
          oAuth: {
            google: id,
            twitter: null
          }
        })
        return done(null, newUser)
      }
    } catch (error) {
      return done(error)
    }
  }))
}