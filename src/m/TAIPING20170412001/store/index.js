import Vue from 'vue'
import Vuex from 'vuex'
import productState from './productState'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        productState
    }
})