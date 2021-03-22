import { Router } from 'express'
const router = Router()

import { Comics, Events, Gachas, Musics, MusicsRequirements, Myumons, MyumonSkills, MyumonSkillArgs } from '../models'

router.put('/edit/myumon/:id', async (req, res, next) => {
  try {
    let myumon = await Myumons.findOne().where('id', req.params.id)
    myumon.translation = req.body.data
    await myumon.save()
    res.json({message: 'ok'})
  } catch(err) {
    next(err)
  }
})

router.put('/edit/skill', async (req, res, next) => {
  try {
    let skill = await MyumonSkills.findOne().where('id', req.body.data.id)
    skill.translation = req.body.data.translation
    await skill.save()
    for (let arg of req.body.data.skill) {
      let skillArg = await MyumonSkillArgs.findOne().where('id', arg.id)
      skillArg.translation = arg.translation
      await skillArg.save()
    }
    res.json({message: 'ok'})
  } catch(err) {
    next(err)
  }
})

router.put('/edit/music/:id', async (req, res, next) => {
  try {
    let music = await Musics.findOne().where('id', req.params.id)
    music.translation = req.body.data
    await music.save()
    res.json({message: 'ok'})
  } catch(err) {
    next(err)
  }
})

router.put('/edit/event/:id', async (req, res, next) => {
  try {
    let event = await Events.findOne().where('id', req.params.id)
    event.translation = req.body.data
    await event.save()
    res.json({message: 'ok'})
  } catch(err) {
    next(err)
  }
})

router.put('/edit/comic/:id', async (req, res, next) => {
  try {
    let comic = await Comics.findOne().where('id', req.params.id)
    comic.translation = req.body.data
    await comic.save()
    res.json({message: 'ok'})
  } catch(err) {
    next(err)
  }
})

export default router