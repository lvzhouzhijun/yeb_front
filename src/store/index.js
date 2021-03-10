import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes: []
  },
  // 作用可以改变  state 里面值的方法
  mutations: {
    initRoutes(state,data){
      state.routes = data
    }
  }
})