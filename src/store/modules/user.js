/**
 * @description 用户信息状态管理
 */
import {login, getUserInfo, loginOut} from '../../api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {SET_USERNAME, SET_AVATAR, SET_TOKEN, RESET_USER_STATE} from '../mutation_type'

const getDefaultState = () => {
    return {
        token: getToken(),
        username: '',
        avatar: ''
    }
}

const state = getDefaultState()

const getters = {
    getUsername: (state) => {
        return state.username
    },
    getAvatar: (state) => {
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
                commit(SET_TOKEN, res.data.token)
                setToken(res.data.token)
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
                const {name, avatar} = res.data
                commit(SET_USERNAME, name)
                commit(SET_AVATAR, avatar)
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
            loginOut().then(res => {
                removeToken()
                commit(RESET_USER_STATE)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
