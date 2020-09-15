import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MusicsSchema = new Schema(
  {
    id: Number,
    artist_id: Number,
    bpm: Number,
    category: Number,
    arranged: String,
    composed: String,
    lyrics: String,
    description: String,
    jacket_image_id: Number,
    music_requirement_id: 0,
    name: String,
    length: Number,
    translation: Object
  },
  {
    versionKey: false
  }
)

const MusicsRequirementsSchema = new Schema(
  {
    id: Number,
    description: String
  },
  {
    versionKey: false
  }
)

const MusicsGradesSchema = new Schema(
  {
    id: Number,
    description: String
  },
  {
    versionKey: false
  }
)

const MusicInfosSchema = new Schema(
  {
    music_id: Number,
    level: Number
  },
  {
    versionKey: false
  }
)

const MusicNotesSchema = new Schema(
  {
    music_id: Number,
    difficulty: Number,
    EndWaveformTiming: Number,
    FirstBeatTiming: Number,
    MaxLaneNum: Number,
    MaxNotesCount: Number,
    NotesInfoList: Array,
    StartFeaverModeTiming: Number,
    StartSeTimingList: Array,
    StartWaveformTiming: Number
  },
  {
    versionKey: false
  }
)

const Musics = mongoose.model('musics', MusicsSchema)
const MusicsRequirements = mongoose.model('music_requirements', MusicsRequirementsSchema)
const MusicsGrades = mongoose.model('music_grades', MusicsGradesSchema)
const MusicInfos = mongoose.model('music_infos', MusicInfosSchema)
const MusicNotes = mongoose.model('music_notes', MusicNotesSchema)

export { Musics, MusicsRequirements, MusicsGrades, MusicInfos, MusicNotes }