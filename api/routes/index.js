import { Router } from 'express'
const router = Router()

import user from './user'
import info from './info'
import bromide from './bromide'
import music from './music'
import event from './event'
import comic from './comic'
import gacha from './gacha'
import edit from './edit'

router.use(user)
router.use(info)
router.use(bromide)
router.use(music)
router.use(event)
router.use(comic)
router.use(gacha)
router.use(edit)

export default router