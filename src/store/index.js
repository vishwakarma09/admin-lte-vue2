import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

import store from '@/store'
import state from './state'
import router from '@/router'
import initializer from '@/lib/helpers/initializer'

Vue.use(Vuex)

const getters = {
  hideHeaderOption: (state) => (option) => {
    return state.user.hideHeaderOption && state.user.hideHeaderOption.indexOf(option) >= 0
  }
}

// mutations are for setting data in store (no direct store data changes allowed)
const mutations = {
  INIT(state, payload) {
    state.subprogram = payload.subprogram
    state.user.language = Vue.localStorage.get('user-language')
    Vue.i18n.set(state.user.language)
    Vue.i18n.fallback('en')
  },

  INIT_TRANSLATION(state, payload) {
    Vue.i18n.add(state.user.language, payload.translation)
  },

  SET_AUTHENTICATED(state, payload) {
    state.user.authenticated = payload.access.authenticated
    state.user.pin = payload.pin
    if (!state.user.authenticated) {
      router.push({ name: '@signin' })
    }
  },

  SIGNOUT(state, init = true) {
    state.user = {
      authenticated: false,
      language: state.user.language,
      usingLayout: true,
      credentials: [],
      dashboards: [],
      timeOutStart: null
    }
    Vue.localStorage.remove('hgroupDashboardFilters')
    if (init) {
      store.dispatch('init')
    }
    router.push({name: '@signin'})
  },

  INCREMENT_SPINNER(state) {
    state.spinner++
  },

  DECREMENT_SPINNER(state) {
    state.spinner--
  },

  RESET_SPINNER() {
    state.spinner = 0
  },

  SET_INIT_PATH_CHECK(state, routerTo) {
    state.pathToCheck = routerTo
  },
  STORE_PAGE_TITLE(state, title) {
    state.uiSettings.pageTitle = title
  },
  SET_SUBPROGRAM_CONFIGURATION(state, payload) {
    state.subprogram.Configuration = payload.Configuration
  },
  SET_EVENT(state, eventFrom) {
    state.loadTime = Date.now()
    state.eventFrom = eventFrom
  }
}

const actions = {
  init: async function(context) {
    try {
      let subprogram = state.subprogram
      if (!subprogram.id) {
        // we are in development vue mode
        subprogram = await initializer.getSubprogram(state)
      }

      // const response = await initializer.init(state, subprogram.id)
      // store.dispatch('setAuthenticated', response)

      // loading subprogram data
      const subprogramWithData = await initializer.getSubprogramData(state, subprogram.id, Vue.localStorage.get('user-language', null))
      const translation = subprogramWithData.Translations
      delete subprogramWithData.Translations
      context.commit('INIT', {subprogram: subprogramWithData})
      context.commit('INIT_TRANSLATION', {subprogram: subprogramWithData, translation: translation})
    } catch (err) {
      console.log(err)
      console.log('initializing error')
    }
  },
  setAuthenticated: async function(context, payload) {
    localStorage.setItem('access', JSON.stringify(payload.access))
    context.commit('SET_AUTHENTICATED', payload)
  },

  signout: async function(context, payload) { // forSwitchUser, noApiCall = false) {
    const forSwitchUser = payload && payload.forSwitchUser
    const noApiCall = payload && payload.noApiCall || false
    if (!forSwitchUser) {
      let logout = false
      localStorage.clear()
      localStorage.setItem('access', JSON.stringify({authenticated: false}))

      try {
        if (state.user.pin && !noApiCall) {
          const url = `${state.api}/Members/${state.user.pin}/logout`
          const response = await axios.get(url)
          logout = true
          localStorage.setItem('access', JSON.stringify(response.data.access))
        }
      } catch (err) {
        console.error(err)
      }
      context.commit('SIGNOUT', !noApiCall)
      if (!logout) {
        // direct use signout url or error
        localStorage.setItem('access', JSON.stringify({authenticated: false}))
      }
      router.push({name: '@signin'})
    } else {
      context.commit('SIGNOUT', false)
    }
  },

  setPageTitle: function(context, routerTo) {
    let pageTitle = 'Member Home'
    if (_.hasIn(routerTo, 'meta.title')) {
      pageTitle = routerTo.meta.title
    }
    context.commit('STORE_PAGE_TITLE', pageTitle)
  },

  setUserLanguage: async function(context, payload) {
    if (!Vue.i18n.exists(payload.language) && Vue.localStorage.get('user-language') !== payload.language) {
      const translations = await initializer.getUserTranslation(state, payload.language)
      Vue.i18n.add(payload.language, translations.data)
    }
    Vue.i18n.set(payload.language)
    context.commit('SET_USER_LANGUAGE', payload)
  }
}

export default new Vuex.Store({
  modules: {},
  state,
  getters,
  mutations,
  actions
})
