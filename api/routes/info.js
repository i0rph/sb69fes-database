import { Router } from 'express'
const router = Router()
import axios from 'axios'

import { Events, Info } from '../models'

router.get('/sidebar', async (req, res, next) => {
  try {
    let app_version = await axios.get('https://itunes.apple.com/lookup?id=1485202694&lang=ja_jp&country=jp')
    let last_update = await Info.findOne().where('name', 'last_update').lean()
    
    let result = {
      app_version: app_version.data.results[0].version,
      last_update: last_update.last_update
    }
    
    res.json(result)
  } catch(err) {
    next(err)
  }
})

router.get('/home', async(req, res, next) => {
  try {
    let date = new Date()
    let event = await Events.findOne().lte('play_started_at', date).gte('play_ended_at', date)
    
    res.json(event)
  } catch(err) {
    next(err)
  }
})
      
export default router
