/**
 * @description 设置状态管理
 */

import {SET_SIDEBAR} from '../mutation_type'

const state = {
    sidebarOpen: false
}

const getters = {
    getSidebarOpen: state => {
        return state.sidebarOpen
    }
}

const mutations = {
    [SET_SIDEBAR]: state => {
        state.sidebarOpen = !state.sidebarOpen
    }
}

const actions = {
    toggleSideBar ({commit}) {
        commit(SET_SIDEBAR)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
