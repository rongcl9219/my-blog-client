/**
 * @description 设置状态管理
 */

import {SET_SIDEBAR, SET_HOME_ASIDE, SET_THEME} from '../mutation_type'
import {cacheThemeInfo} from '@/utils/auth'

const state = {
    sidebarOpen: false,
    homeAside: false,
    theme: cacheThemeInfo.load() || 'blove'
}

const getters = {
    getSidebarOpen: state => {
        return state.sidebarOpen
    },
    getHomeAside: state => {
        return state.homeAside
    },
    getTheme: state => {
        return state.theme
    }
}

const mutations = {
    [SET_SIDEBAR]: state => {
        state.sidebarOpen = !state.sidebarOpen
    },
    [SET_HOME_ASIDE]: state => {
        state.homeAside = !state.homeAside
    },
    [SET_THEME]: (state, theme) => {
        state.theme = theme
    }
}

const actions = {
    toggleSideBar ({commit}) {
        commit(SET_SIDEBAR)
    },
    toggleHomeAside  ({commit}) {
        commit(SET_HOME_ASIDE)
    },
    setTheme ({commit}, theme) {
        cacheThemeInfo.save(theme)
        commit(SET_THEME, theme)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
