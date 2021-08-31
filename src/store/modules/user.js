/**
 * @description 用户信息状态管理
 */
import {login, getUserInfo, loginOut, refreshToken} from '@/api/user'
import {cacheAccessToken, cacheRefreshToken} from '@/utils/auth'
import {SET_USERNAME, SET_AVATAR, SET_TOKEN, RESET_USER_STATE} from '../mutation_type'

const getDefaultState = () => {
    return {
        token: cacheAccessToken.load(),
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
    [SET_TOKEN]: (state, token) => {
        state.token = token
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
    login ({commit}, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            login({username, password}).then(res => {
                commit(SET_TOKEN, res.data.accessToken)
                cacheAccessToken.save(res.data.accessToken)
                cacheRefreshToken.save(res.data.refreshToken)
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
    loginOut ({commit}) {
        return new Promise((resolve, reject) => {
            cacheAccessToken.delete()
            cacheRefreshToken.delete()
            commit(RESET_USER_STATE)
            loginOut().then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    /**
     * 刷新token
     * @returns {Promise<unknown>}
     */
    refreshToken ({commit}) {
        return new Promise((resolve, reject) => {
            refreshToken().then(res => {
                commit(SET_TOKEN, res.data.accessToken)
                cacheAccessToken.save(res.data.accessToken)
                cacheRefreshToken.save(res.data.refreshToken)
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
