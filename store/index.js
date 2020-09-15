import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  authUser: null,
  rarityConst: {
    1: "R",
    2: "RR",
    3: "SR",
    4: "SSR",
    5: "UR"
  },
  bromideFilter: {
    rarity: [],
    attribute: [],
    character: [],
    sortOrder: "1",
    sortBy: 'id',
    shinka: false
  },
  musicFilter: {
    attribute: [],
    artist: [],
    sortOrder: "1",
    sortBy: 'id'
  },
  eventFilter: {
    sortOrder: "1"
  },
  gachaFilter: {
    sortOrder: "1"
  },
  comicFilter: {
    sortOrder: "1"
  },
  grid: 'list',
  showJP: false
})

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (req.session) {
      if (req.session.authUser) commit('SET_USER', req.session.authUser)
    }
  },
  async signin({ commit }, { email, password }) {
    if (!email || !password) {
      let err = new Error('All field required.')
      err.name = 'FieldRequiredError'
      throw err
    }
    try {
      const data = await this.$axios.$post('/api/signin', { email, password })
      commit('SIGNIN', data)
    } catch (error) {
      let err = new Error('Email or Password not match.')
      err.name = 'NoMatchError'
      throw err
    }
  },
  async register ({ commit }, { email, password, username, role }) {
    if (!email || !password || !username) {
      let err = new Error('All field required.')
      err.name = 'FieldRequiredError'
      throw err
    }
    try {
      const data = await this.$axios.$post('/api/register', { email, password, username, role })
      commit('SET_USER', data)
    } catch (error) {
      switch (error.response.status || 500) {
        case 409:
          let err = new Error('Duplicated email.')
          err.name = 'DuplicatedError'
          throw err
        case 500:
          let err500 = new Error('Internal server error occurred.')
          err500.name = 'InternalServerError'
          throw err500
      }
    }
  },
  async signout ({ commit }) {
    const data = await this.$axios.$post('/api/signout')
    if (data.ok) commit('SIGNOUT')
  },
  async reset ({ commit }, { token, password }) {
    if (!password) {
      let err = new Error('Password required')
      err.name = 'PasswordRequiredError'
      throw err
    }
    try {
      const data = await this.$axios.$post('/api/reset/' + token, { password })
      commit('SET_USER', data)
    } catch (error) {
      switch (error.response.status || 500) {
        case 404:
          let err = new Error('Invalid or expired token.')
          err.name = 'TokenError'
          throw err
        case 500:
          let err500 = new Error('Internal server error occurred.')
          err500.name = 'InternalServerError'
          throw err500
      }
    }
  }
}

export const getters = {
  getField
}

export const mutations = {
  updateField,
  SIGNIN: function (state, user) {
    state.authUser = user
  },
  SIGNOUT: function (state) {
    state.authUser = null
  },
  SET_USER: function (state, user) {
    state.authUser = user
  }
}