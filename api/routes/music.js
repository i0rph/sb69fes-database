import { Router } from 'express'
const router = Router()

import { Musics, MusicsRequirements, MusicsGrades, MusicInfos, MusicNotes } from '../models'

router.get('/music', async (req, res, next) => {
  try {
    let musics = await Musics.find().select('-_id').exec()
    res.json(musics)
  } catch(err) {
    next(err)
  }
})

router.get('/music/:id', async (req, res, next) => {
  try {
    let music = await Musics.findOne().where('id', req.params.id).select('-_id -ended_at -fever_started_at -name_hiragana -started_at').lean()
    
    if (music.music_requirement_id !== 0) {
      let requirement = await MusicsRequirements.findOne().where('id', music.music_requirement_id).select('name').exec()
      music.requirement = requirement.description
    }
    
    let musicInfo = await MusicInfos.findOne().where('MusicId', music.id).select('InfoSet').lean()
    if (musicInfo) {
      music.info = musicInfo.InfoSet.SimpleChartInfos
    } else {
      music.info = [{}, {}, {}, {}]
    }
    
    let musicGrades = await MusicsGrades.find().where('music_id', music.id).select('grade level').sort('grade').lean()
    for (let idx in musicGrades) {
      music.info[idx].level = musicGrades[idx].level
    }
    
    res.json(music)
    
  } catch(err) {
    next(err)
  }
})

router.get('/music/:id/:difficulty', async (req, res, next) => {
  try {
    let notesInfo = await MusicNotes.findOne().where('music_id', req.params.id).where('difficulty', req.params.difficulty)
    res.json(notesInfo)
  } catch(err) {
    next(err)
  }
})

export default router