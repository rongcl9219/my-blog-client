/**
 * @description 导入所有 vuex 模块
 */

import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user
    }
})

export default store
