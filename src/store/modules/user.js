/**
 * @description 用户信息状态管理
 */
import {login, getUserInfo, loginOut} from '@/api/user'
import {SET_USERNAME, SET_AVATAR, RESET_USER_STATE} from '../mutation_type'

const getDefaultState = () => {
    return {
        username: '',
        avatar: ''
    }
}

const state = getDefaultState()

const getters = {
    getUsername: state => {
        return state.username
    },
    getAvatar: state => {
        return state.avatar
    }
}

const mutations = {
    [RESET_USER_STATE]: state => {
        Object.assign(state, getDefaultState())
    },
    [SET_USERNAME]: (state, username) => {
        state.username = username
    },
    [SET_AVATAR]: (state, avatar) => {
        state.avatar = avatar
    }
}

const actions = {
    /**
     * 用户登录
     * @param userInfo
     * @returns {Promise<unknown>}
     */
    login ({dispatch}, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            login({username, password}).then(res => {
                dispatch('common/setToken', res.data, {root: true})
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    /**
     * 获取用户信息
     * @returns {Promise<unknown>}
     */
    getUserInfo ({commit}) {
        return new Promise((resolve, reject) => {
            getUserInfo().then(res => {
                const {userName, avatarUrl} = res.data.userInfo
                commit(SET_USERNAME, userName)
                commit(SET_AVATAR, avatarUrl)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    /**
     * 退出登录
     * @returns {Promise<unknown>}
     */
    loginOut ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            dispatch('common/clearToken', {}, {root: true})
            commit(RESET_USER_STATE)
            loginOut().then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    setUserAvatar ({commit}, avatarUrl) {
        commit(SET_AVATAR, avatarUrl)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
