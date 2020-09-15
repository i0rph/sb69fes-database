import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MyumonsSchema = new Schema(
  {
    id: Number,
    myumon_basic_id: Number,
    name: String,
    music_category: Number,
    rarity: Number,
    life: Number,
    rhythm: Number,
    melody: Number,
    harmony: Number,
    main_1_skill_id: Number,
    main_2_skill_id: Number,
    support_skill_id: Number,
    shinka_myumon_id: Number,
    unshinka_myumon_id: Number,
    description: String,
    translation: Object
  },
  {
    versionKey: false
  }
)

const MyumonSkillsSchema = new Schema(
  {
    id: Number,
    name: String,
    myumon_skill_effect_id: Number,
    effect_arg_no: Number,
    translation: Object
  },
  {
    versionKey: false
  }
)

const MyumonSkillArgsSchema = new Schema(
  {
    id: Number,
    effect_arg_no: Number,
    level: Number,
    digest: String,
    description: String,
    translation: Object
  },
  {
    versionKey: false
  }
)

const MyumonGrowCurvesSchema = new Schema(
  {
    id: Number,
    group_no: Number,
    level: Number,
    exp_start: Number,
    exp_end: Number,
    life: Number,
    rhythm: Number,
    melody: Number,
    harmony: Number
  },
  {
    versionKey: false
  }
)

const Myumons = mongoose.model('myumons', MyumonsSchema)
const MyumonSkills = mongoose.model('myumon_skills', MyumonSkillsSchema)
const MyumonSkillArgs = mongoose.model('myumon_skill_effect_args', MyumonSkillArgsSchema)
const MyumonGrowCurves = mongoose.model('myumon_grow_curves', MyumonGrowCurvesSchema)

export { Myumons, MyumonSkills, MyumonSkillArgs, MyumonGrowCurves }