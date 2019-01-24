import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'

import auth from './Auth'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})


export default function () {
  const Store = new Vuex.Store({
    modules:{
      auth
    },
    plugins:[vuexLocal.plugin]
  })

  return Store
}
