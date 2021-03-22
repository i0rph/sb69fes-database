import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/auth/twitter', (req, res, next) => {
  req.session.redirect = req.query.redirect
  next()
}, passport.authenticate('twitter', { scope: ['profile','email'] }))

router.get('/auth/google', (req, res, next) => {
  req.session.redirect = req.query.redirect
  next()
}, passport.authenticate('google', { scope: ['profile','email'] }))

router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res, next) => {
  req.user.password = undefined
  req.session.authUser = req.user
  let locale = req.cookies.i18n_redirected
  if (req.session.redirect) {
    let url = req.session.redirect
    req.session.redirect = undefined
    res.redirect(url)
  } else res.redirect(`../../${locale == 'en' ? '' : locale}`)
})

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res, next) => {
  req.user.password = undefined
  req.session.authUser = req.user
  let locale = req.cookies.i18n_redirected
  if (req.session.redirect) {
    let url = req.session.redirect
    req.session.redirect = undefined
    res.redirect(url)
  } else res.redirect(`../../${locale == 'en' ? '' : locale}`)
})

export default router