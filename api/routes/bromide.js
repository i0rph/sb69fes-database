import { Router } from 'express'
const router = Router()

import { Myumons, MyumonSkills, MyumonSkillArgs, MyumonGrowCurves } from '../models'

router.get('/bromide', async (req, res, next) => {
  try {
    let myumons = await Myumons.find().select('-_id')
    res.json(myumons)
  } catch(err) {
    next(err)
  }
})

router.get('/bromide/table', async (req, res, next) => {
  try {
    let myumons = await Myumons.find().select('-_id').lean()
    
    let levelLimit = {
      1: 30,
      2: 40,
      3: 50,
      4: 55,
      5: 60
    }
    
    for (let [idx, myumon] of myumons.entries()) {
      let grow_curve = await MyumonGrowCurves.findOne().where('group_no', myumon.grow_curve_group_no).where('level', levelLimit[myumon.rarity])
      
      myumon.life += grow_curve.life
      myumon.rhythm += grow_curve.rhythm
      myumon.melody += grow_curve.melody
      myumon.harmony += grow_curve.harmony
      
      if (myumon.rarity === 5) {
        let ur_basic = await MyumonGrowCurves.findOne().where('group_no', myumon.grow_curve_group_no).where('level', 35)
        myumon.life += ur_basic.life
        myumon.rhythm += ur_basic.rhythm
        myumon.melody += ur_basic.melody
        myumon.harmony += ur_basic.harmony
      }
    }
    res.json(myumons)
  } catch(err) {
    next(err)
  }
})

router.get('/bromide/:id', async (req, res, next) => {
  try {
    let myumon = await Myumons.findOne().where('id', req.params.id).select('-_id -asset_id -mini_asset_id').lean()

    if (myumon.shinka_myumon_id === 0) {
      let unshinka = await Myumons.findOne().where('shinka_myumon_id', myumon.id)
      if (unshinka) myumon.unshinka_myumon_id = unshinka.id
    }
    
    let levelLimit = {
      1: 30,
      2: 40,
      3: 50,
      4: 55,
      5: 60
    }
    
    let grow_curve = await MyumonGrowCurves.findOne().where('group_no', myumon.grow_curve_group_no).where('level', levelLimit[myumon.rarity])
    if (myumon.rarity === 5) {
      let ur_basic = await MyumonGrowCurves.findOne().where('group_no', myumon.grow_curve_group_no).where('level', 35)
      myumon.ur_basic = ur_basic
    }
    myumon.max = grow_curve
    
    let skills = []
    
    const skill_1 = await MyumonSkills.findOne().where('id', myumon.main_1_skill_id).select('-_id id name myumon_skill_effect_id effect_arg_no translation').lean()
    skill_1.type = 1
    skills.push(skill_1)
    
    if (myumon.main_2_skill_id !== 0) {
      let skill_2 = await MyumonSkills.findOne().where('id', myumon.main_2_skill_id).select('-_id id name myumon_skill_effect_id effect_arg_no translation').lean()
      skill_2.type = 2
      skills.push(skill_2)
    }
    
    let skill_support = await MyumonSkills.findOne().where('id', myumon.support_skill_id).select('-_id id name myumon_skill_effect_id effect_arg_no translation').lean()
    skill_support.type = 3
    skills.push(skill_support)
    
    let skillsArr = skills.map(skill => {return skill.effect_arg_no})
    let skillInfos = await MyumonSkillArgs.find().in('effect_arg_no', skillsArr)
    
    for (let idx in skills) {
      skills[idx].skill = skillInfos.filter(skillInfo => skillInfo.effect_arg_no === skills[idx].effect_arg_no).sort(function (a,b) {return a.level - b.level})
      skills[idx].level = 10
    }
    
    myumon.skills = skills

    res.json(myumon)

  } catch(err) {
    next(err)
  }
})

export default router