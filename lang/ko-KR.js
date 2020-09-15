import ko from 'vee-validate/dist/locale/ko.json'
import element from 'element-ui/lib/locale/lang/ko'

export default {
  siteName: 'SHOW BY ROCK!! Fes A Live 데이터베이스',
  validation: ko.messages,
  ...element,
  page: {
    home: '홈',
    bromide: {
      title: '브로마이드',
      home: '홈',
      table: '데이터 테이블'
    },
    music: {
      title: '음악'
    },
    event: {
      title: '이벤트'
    },
    gacha: {
      title: '가챠'
    },
    comic: {
      title: '만화'
    },
    account: {
      title: '계정',
      register: '회원가입',
      login: '로그인'
    }
  },
  error: {
    title: '페이지를 표시하는 중에 문제가 발생하였습니다.',
    description: '권한이 필요한 페이지에 접속을 시도하였거나 서버내부 오류가 발생했습니다.',
    return: '홈페이지로 이동',
    occurred: '오류가 발생했습니다.',
    FieldRequiredError: '모든 필드를 입력하셔야 합니다.',
    NoMatchError: '이메일 또는 비밀번호가 일치하지 않습니다.',
    DuplicatedError: '입력하신 이메일이 이미 존재합니다.',
    InternalServerError: '내부 서버오류가 발생했습니다.',
    PasswordRequiredError: '비밀번호를 입력해주십시오.',
    TokenError: '유효하지 않거나 만료된 토큰입니다.'
  },
  account: {
    email: '이메일',
    password: '비밀번호',
    passwordConfirm: '비밀번호 확인',
    passwordrule: '비밀번호는 8~30자 영문 대 소문자, 숫자, 특수문자를 사용하여야 합니다.',
    username: '사용자명',
    terms: {
      title: '개인정보수집 및 처리방침에 관한 동의',
      description: '개인정보수집 및 처리방침에 관한 동의'
    },
    register: '회원가입',
    login: '로그인',
    logout: '로그아웃',
    profile: '프로필',
    setting: '설정',
    or: '또는',
    register_twitter: '트위터 계정으로 회원가입',
    register_google: '구글 계정으로 회원가입',
    login_twitter: '트위터 계정으로 로그인',
    login_google: '구글 계정으로 로그인'
  },
  sidebar: {
    version: {
      title: '데이터베이스 정보',
      database: '데이터베이스 버전',
      app: '어플리케이션 버전'
    },
    discord: '디스코드',
    twitter: '트위터'
  },
  option: {
    showJP: '일본어 표시',
    yes: '예',
    no: '아니오'
  },
  attribute: {
    label: '속성',
    1: '도키도키',
    2: '와쿠와쿠',
    3: '키라키라'
  },
  sort: {
    label: '정렬',
    id: 'ID',
    rarity: '레어도',
    name: '이름',
    title: '제목',
    character: '캐릭터',
    band: '밴드',
    attribute: '속성',
    ascending: '오름차순',
    descending: '내림차순',
    length: '길이'
  },
  edit: {
    title: '번역 수정',
    name: '이름',
    description: '설명',
    submit: '수정'
  },
  life: '라이프',
  rhythm: '리듬',
  melody: '멜로디',
  harmony: '하모니',
  total: '종합력',
  bromide: {
    filterShinka: {
      label: '각성 가능 브로마이드만 표시',
      yes: '네',
      no: '아니오'
    },
    skill: {
      label: '스킬',
      support: '서포트 스킬'
    },
    shinka: '각성',
    unshinka: '각성 전',
    default: '기본',
    max: '최대'
  },
  skill: {
    digest: '요약',
    description: '설명'
  },
  music: {
    composed: '작곡',
    arranged: '편곡',
    lyrics: '작사',
    length: '길이'
  },
  gacha: {
    start: '시작',
    end: '종료',
    caution: '주의사항',
    description: '설명'
  },
  event: {
    start: '시작',
    end: '종료',
    day: '일',
    hour: '시간',
    minute: '분',
    second: '초',
    left: '남음',
    myumons: '이벤트 보너스 브로마이드',
    category_name: '이벤트 카테고리'
  },
  artist: {
    mashumairesh: 'Mashumairesh!!',
    plasmagica: '플라즈마지카',
    mugenan: '무료한 꼭두각시 무환암',
    bvl: 'BUD VIRGIN LOGIC',
    reijingsignal: 'REIJINGSIGNAL',
    dokonjofinger: 'DOKONJOFINGER',
    shingan: '심안크림슨즈',
    trichronika: '트라이크로니카',
    arcareafact: 'ARCAREAFACT',
    criticrista: '크리티크리스타',
    yokazenohorizon: 'Yokazenohorizon',
    shinimonogurui: '시니모노구루이',
    uwasanopetals: '우와사노페탈즈',
    ninjinriot: "닌진 라이어트",
    special: '스페셜',
    independent: '무소속'
  },
  character: {
    howan: '호완',
    himeko: '마시마 히메코',
    delmin: '데루밍',
    ruhuyu: '르후유',
    cyan: '시안',
    chuchu: '츄츄',
    retoree: '레토리',
    moa: '모아',
    darudayu: '다르다유',
    a: '아',
    un: '운',
    ailane: '아이렌',
    peipain: '페이페인',
    hundrekko: '헌드레코',
    rararin: '라라린',
    sumomone: '스모모네',
    uiui: '우이우이',
    yasu: '야스',
    hachin: '하친',
    joe: '죠',
    sojun: '소준',
    crow: '크로우',
    aion: '아이온',
    yaiba: '야이바',
    rom: '롬',
    shuuzo: '슈☆조',
    kai: '카이',
    riku: '리쿠',
    titan: '티탄',
    orion: '오리온',
    selen: '세렌',
    argon: '아르곤',
    rosia: '로지아',
    tsukino: '츠키노',
    holmy: '호르미',
    jacklyn: '재클린',
    rikao: '리카오',
    jalop: '쟈로프',
    kusuka: '쿠스카',
    uraragi: '우라라기',
    marimari: '마리마리',
    dyuradyura: '듀라듀라',
    monmon: '몽몽',
    tsugihagi: '츠기하기',
    gashigashi: '가시가시',
    shibarin: '시바린',
    pokoe: '포코에',
    kittsun: '킷츤',
    hakkun: '핫군',
    arashi: '아라시',
    oboro: '오보로',
    rin: '린',
    kamui: '카무이'
  }
}
