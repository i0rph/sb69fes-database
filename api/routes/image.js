import { Myumons } from '../models'
import sharp from 'sharp'
import { Router } from 'express'
import path from 'path'
const router = Router()

router.get('/thumbnail/:id', async (req, res, next) => {
  try {
    let basedir = '../../static/asset'
    let myumon = await Myumons.findOne().where('id', req.params.id).select('id music_category rarity').lean()
    let attribute = await sharp(path.join(__dirname, `${basedir}/cardicons/attribute_${myumon.music_category}.png`)).resize(38).toBuffer()
    let frame = await sharp(path.join(__dirname, `${basedir}/cardicons/IconFrame_${myumon.music_category}.png`)).resize(133).composite([{input:attribute,gravity:'southwest'}]).toBuffer()
    let image = await sharp({create: { width: 145, height: 145, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 }}})
      .composite([
        { input: path.join(__dirname, `${basedir}/bromide/characterface${String(myumon.id).padStart(8, '0')}.png`), gravity: 'center' },
        { input: frame, gravity: 'center' },
        { input: path.join(__dirname, `${basedir}/cardicons/RarityBase_${myumon.music_category}.png`), gravity: 'northwest' },
        { input: path.join(__dirname, `${basedir}/cardicons/Rarity_${myumon.rarity}.png`), gravity: 'northwest', top: 0, left: myumon.rarity === 1 ? 16 : [2,3].includes(myumon.rarity) ? 8 : myumon.rarity === 5 ? 6 : 2 }
      ])
      .webp({ lossless: true })
      .toBuffer()
    res.contentType('image/webp')
    res.send(image)
  } catch(err) {
    next(err)
  }
})

router.use('/:type/:id', async (req, res, next) => {
  try {
    let basedir = '../../static/asset'
    let filenameObj = {
      bromide: `charactercard${req.params.id.padStart(8, '0')}`,
      comic: `manga${req.params.id.padStart(8, '0')}`,
      event: `eventlogo${req.params.id.padStart(8, '0')}`,
      gacha: `gachalogo${req.params.id.padStart(8, '0')}`,
      musicjacket: `musicjacket${req.params.id.padStart(8, '0')}`,
      skillicons: `skillicon${req.params.id.padStart(8, '0')}`
    }
    let image = await sharp(path.join(__dirname, `${basedir}/${req.params.type}/${filenameObj[req.params.type]}.png`)).webp({ lossless: true }).toBuffer()
    res.contentType('image/webp')
    res.send(image)
  } catch(err) {
    next(err)
  }
})

export default router
