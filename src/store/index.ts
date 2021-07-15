import Vue from 'vue'
import Vuex from 'vuex'
import tag from './tagModule'
import record from './recordModule'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    record,
    tag,
  },
})

export default store;
