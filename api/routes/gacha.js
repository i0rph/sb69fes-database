import { Router } from 'express'
const router = Router()

import { Gachas } from '../models'

router.get('/gacha', async (req, res, next) => {
  try {
    let gachas = await Gachas.find().select('-_id id name')
    res.json(gachas)
  } catch(err) {
    next(err)
  }
})

router.get('/gacha/:id', async (req, res, next) => {
  try {
    let gacha = await Gachas.findOne().where('id', req.params.id).select('-_id').lean()
    res.json(gacha)
  } catch(err) {
    next(err)
  }
})

export default router