/**
 * @description 设置状态管理
 */

import {SET_SIDEBAR, SET_HOME_ASIDE} from '../mutation_type'

const state = {
    sidebarOpen: false,
    homeAside: false
}

const getters = {
    getSidebarOpen: state => {
        return state.sidebarOpen
    },
    getHomeAside: state => {
        return state.homeAside
    }
}

const mutations = {
    [SET_SIDEBAR]: state => {
        state.sidebarOpen = !state.sidebarOpen
    },
    [SET_HOME_ASIDE]: state => {
        state.homeAside = !state.homeAside
    }
}

const actions = {
    toggleSideBar ({commit}) {
        commit(SET_SIDEBAR)
    },
    toggleHomeAside  ({commit}) {
        commit(SET_HOME_ASIDE)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
