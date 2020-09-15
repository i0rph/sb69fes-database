import { Router } from 'express'
const router = Router()

import { Comics } from '../models'

router.get('/comic', async (req, res, next) => {
  try {
    let comics = await Comics.find().select('-_id')
    res.json(comics)
  } catch(err) {
    next(err)
  }
})

router.get('/comic/:id', async (req, res, next) => {
  try {
    let comic = await Comics.findOne().where('id', req.params.id).select('-_id').lean()
    res.json(comic)
  } catch(err) {
    next(err)
  }
})

export default router