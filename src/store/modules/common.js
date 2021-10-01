/**
 * @description 公共状态管理
 */

import {refreshToken} from '@/api/common'
import {cacheAccessToken, cacheRefreshToken, cacheTokenExp} from '@/utils/auth'
import {SET_TOKEN, REFRESH_TOKEN, SET_TOKEN_EXP} from '../mutation_type'

const state = {
    token: cacheAccessToken.load() || null,
    refreshToken: cacheRefreshToken.load() || null,
    tokenExp: cacheTokenExp.load() || null
}

const getters = {
    getToken: state => {
        return state.token
    },
    getRefreshToken: state => {
        return state.refreshToken
    },
    getTokenExp: state => {
        return state.tokenExp
    }
}

const mutations = {
    [SET_TOKEN]: (state, token) => {
        state.token = token
    },
    [REFRESH_TOKEN]: (state, refreshToken) => {
        state.refreshToken = refreshToken
    },
    [SET_TOKEN_EXP]: (state, tokenExp) => {
        state.tokenExp = tokenExp
    }
}

const actions = {
    /**
     * 刷新token
     * @returns {Promise<unknown>}
     */
    refreshToken ({dispatch}) {
        return new Promise((resolve, reject) => {
            refreshToken().then(res => {
                dispatch('setToken', res.data)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    /**
     * 设置token
     * @param commit
     * @param tokenInfo
     * @returns {Promise<unknown>}
     */
    setToken ({commit}, tokenInfo) {
        const {accessToken, refreshToken, exp} = tokenInfo
        const dateNow = new Date().getTime()
        const tokenExpireTime = dateNow + exp
        commit(SET_TOKEN, accessToken)
        commit(REFRESH_TOKEN, refreshToken)
        commit(SET_TOKEN_EXP, tokenExpireTime)
        cacheAccessToken.save(accessToken)
        cacheRefreshToken.save(refreshToken)
        cacheTokenExp.save(tokenExpireTime)
    },
    /**
     * 清除token
     * @param commit
     */
    clearToken ({commit}) {
        commit(SET_TOKEN, null)
        commit(REFRESH_TOKEN, null)
        commit(SET_TOKEN_EXP, null)
        cacheAccessToken.delete()
        cacheRefreshToken.delete()
        cacheTokenExp.delete()
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
