import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/auth/twitter', passport.authenticate('twitter', { scope: ['profile','email'] }))

router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }))

router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res, next) => {
  req.user.password = undefined
  req.session.authUser = req.user
  let locale = req.cookies.i18n_redirected
  res.redirect(`../../${locale == 'en' ? '' : locale}`)
})

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res, next) => {
  console.log(req.user)
  req.user.password = undefined
  req.session.authUser = req.user
  let locale = req.cookies.i18n_redirected
  res.redirect(`../../${locale == 'en' ? '' : locale}`)
})

export default router