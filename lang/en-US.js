import en from 'vee-validate/dist/locale/en.json'
import element from 'element-ui/lib/locale/lang/en'

export default {
  siteName: 'SHOW BY ROCK!! Fes A Live Database',
  validation: en.messages,
  ...element,
  page: {
    home: 'Home',
    bromide: {
      title: 'Bromide',
      home: 'Home',
      table: 'Data Table'
    },
    music: {
      title: 'Music'
    },
    event: {
      title: 'Event'
    },
    gacha: {
      title: 'Gacha'
    },
    comic: {
      title: 'Comic'
    },
    account: {
      title: 'Account',
      register: 'Register',
      login: 'Login'
    }
  },
  error: {
    title: 'There\'s problem with showing page.',
    description: 'You tried to access authorized page or internal server error occurred.',
    return: 'Return to homepage',
    occurred: 'Error occurred.',
    FieldRequiredError: 'All field is required.',
    NoMatchError: 'Email or password doesn\'t match.',
    DuplicatedError: 'Duplicated email.',
    InternalServerError: 'Internal server error occurred.',
    PasswordRequiredError: 'Password is required.',
    TokenError: 'Invalid or expired token.'
  },
  account: {
    email: 'Email',
    password: 'Password',
    passwordConfirm: 'Password Confirm',
    passwordrule: 'Make sure it\'s at least 8 characters including number, uppercase letter, lowercase letter and special character.',
    username: 'Username',
    terms: {
      description: 'I agree with the Privacy Policy'
    },
    register: 'Register',
    login: 'Login',
    logout: 'Logout',
    profile: 'Profile',
    setting: 'Setting',
    or: 'or',
    register_twitter: 'Register with Twitter',
    register_google: 'Register with Google',
    login_twitter: 'Login with Twitter',
    login_google: 'Login with Google'
  },
  sidebar: {
    version: {
      title: 'Database Information',
      database: 'Database Version',
      app: 'Application Version'
    },
    discord: 'Discord',
    twitter: 'Twitter'
  },
  option: {
    showJP: 'Show Japanese text',
    yes: 'Yes',
    no: 'No'
  },
  attribute: {
    label: 'Attribute',
    1: 'Dokidoki',
    2: 'WakuWaku',
    3: 'KiraKira',
  },
  sort: {
    label: 'Sort By',
    id: 'ID',
    rarity: 'Rarity',
    name: 'Name',
    title: 'Title',
    character: 'Character',
    band: 'Band',
    attribute: 'Attribute',
    ascending: 'Ascending',
    descending: 'Descending',
    length: 'Length'
  },
  edit: {
    title: 'Edit Translation',
    name: 'Name',
    description: 'Description',
    submit: 'Edit'
  },
  life: 'Life',
  rhythm: 'Rhythm',
  melody: 'Melody',
  harmony: 'Harmony',
  total: 'Total',
  bromide: {
    filterShinka: {
      label: 'Show Awakenable Bromides Only',
      yes: 'Yes',
      no: 'No'
    },
    skill: {
      label: 'Skill',
      support: 'Support Skill'
    },
    shinka: 'Awaken',
    unshinka: 'Before Awaken',
    default: 'Default',
    max: 'Max'
  },
  skill: {
    digest: 'Digest',
    description: 'Description'
  },
  music: {
    composed: 'Composed',
    arranged: 'Arranged',
    lyrics: 'Lyrics',
    length: 'Length'
  },
  gacha: {
    start: 'Start',
    end: 'End',
    caution: 'Caution',
    description: 'Description'
  },
  event: {
    start: 'Start',
    end: 'End',
    day: 'day',
    hour: 'hour',
    minute: 'minute',
    second: 'second',
    left: 'left',
    myumons: 'Event Bonus Bromides',
    category_name: 'Event Category'
  },
  artist: {
    mashumairesh: 'Mashumairesh!!',
    plasmagica: 'Plasmagica',
    mugenan: 'Tsurezure Naru Ayatsuri Mugenan',
    bvl: 'BUD VIRGIN LOGIC',
    reijingsignal: 'REIJINGSIGNAL',
    dokonjofinger: 'DOKONJOFINGER',
    shingan: 'ShinganCrimsonZ',
    trichronika: 'Trichronika',
    arcareafact: 'ARCAREAFACT',
    criticrista: 'Criticrista',
    yokazenohorizon: 'Yokazenohorizon',
    shinimonogurui: 'Shinimonogurui',
    uwasanopetals: 'Uwasanopetals',
    ninjinriot: "Ninjinriot",
    special: 'Special',
    independent: 'Independent'
  },
  character: {
    howan: 'Howan',
    himeko: 'Mashima Himeko',
    delmin: 'Delmin',
    ruhuyu: 'Ruhuyu',
    cyan: 'Cyan',
    chuchu: 'Chuchu',
    retoree: 'Retoree',
    moa: 'Moa',
    darudayu: 'Daru Dayu',
    a: 'A',
    un: 'Un',
    ailane: 'Ailane',
    peipain: 'Peipain',
    hundrekko: 'Hundrekko',
    rararin: 'Rararin',
    sumomone: 'Sumomone',
    uiui: 'Uiui',
    yasu: 'Yasu',
    hachin: 'Hachin',
    joe: 'Joe',
    sojun: 'Sojun',
    crow: 'Crow',
    aion: 'Aion',
    yaiba: 'Yaiba',
    rom: 'Rom',
    shuuzo: 'Shuu☆Zo',
    kai: 'Kai',
    riku: 'Riku',
    titan: 'Titan',
    orion: 'Orion',
    selen: 'Selen',
    argon: 'Argon',
    rosia: 'Rosia',
    tsukino: 'Tsukino',
    holmy: 'Holmy',
    jacklyn: 'Jacklyn',
    rikao: 'Rikao',
    jalop: 'Jalop',
    kusuka: 'Kusuka',
    uraragi: 'Uraragi',
    marimari: 'Marimari',
    dyuradyura: 'DyuraDyura',
    monmon: 'MonMon',
    tsugihagi: 'Tsugihagi',
    gashigashi: 'GashiGashi',
    shibarin: 'Shibarin',
    pokoe: 'Pokoe',
    kittsun: 'Kittsun',
    hakkun: 'Hakkun',
    arashi: 'Arashi',
    oboro: 'Oboro',
    rin: 'Rin',
    kamui: 'Kamui'
  }
}
