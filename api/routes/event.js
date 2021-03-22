import { Router } from 'express'
const router = Router()

import { Events, EventMyumons, Gachas } from '../models'

router.get('/event', async (req, res, next) => {
  try {
    let events = await Events.find().select('-_id')
    res.json(events)
  } catch(err) {
    next(err)
  }
})

router.get('/event/:id', async (req, res, next) => {
  try {
    let event = await Events.findOne().where('id', req.params.id).select('-_id').lean()
    let myumons = await EventMyumons.find().where('event_id', event.id).select('-_id myumon_id').lean()
    let gacha = await Gachas.findOne().where('event_id', event.id).lean()
    event.event_gacha = gacha
    event.event_myumons = myumons
    res.json(event)
  } catch(err) {
    next(err)
  }
})

export default router