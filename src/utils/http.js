import axios from 'axios'
import {Message} from 'element-ui'
import router from '@/router/index'
import store from '@/store'

const http = axios.create({
    baseURL: '/api/',
    timeout: 5000
})

let isRefreshing = false

let requestList = []

// 添加请求拦截
http.interceptors.request.use(config => {
    const timestamp = new Date().getTime()

    // 添加时间戳
    config.params = {
        _: timestamp,
        ...config.params
    }

    // 请求头添加token
    const {token, refreshToken, tokenExp} = store.state.common

    if (/^(\/admin)/.test(config.url)) {
        if (token && tokenExp) {
            config.headers['authorization'] = `Bearer ${token}`

            const dateNow = new Date().getTime()
            // token过期
            if (dateNow >= tokenExp) {
                if (!isRefreshing) {
                    isRefreshing = true

                    store.dispatch('common/refreshToken').then(res => {
                        const {accessToken} = res.data
                        isRefreshing = false
                        config.headers['authorization'] = `Bearer ${accessToken}`
                        requestList.forEach((cb) => cb(accessToken))
                        requestList = []
                    }).catch(() => {
                        requestList = []
                        isRefreshing = false
                        router.replace({path: '/403'}).then(() => {})
                    })
                }

                // 正在刷新token，返回一个未执行resolve的promise
                return new Promise((resolve) => {
                    // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                    requestList.push((accessToken) => {
                        config.headers['authorization'] = `Bearer ${accessToken}`
                        resolve(config)
                    })
                })
            }
        }
        return config
    }

    if (config.url === '/refreshToken') {
        config.headers['authorization'] = `Bearer ${token} ${refreshToken}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 添加相应拦截器
http.interceptors.response.use(response => {
    if (!response.data.status) {
        if (response.data.code === -4001) {
            router.replace({path: '/403'}).then(() => {})
        }

        return Promise.reject(response.data)
    }
    return response
}, error => {
    Message.closeAll()
    Message({
        type: 'error',
        message: '请求失败'
    })
    return Promise.reject(error)
})

/**
 * get请求
 * @param {String} url 接口地址
 * @param {Object} params 请求参数
 * @returns {Promise<unknown>}
 */
const fetchGet = (url, params) => {
    return new Promise((resolve, reject) => {
        http.get(url, {params: params}).then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}

/**
 * post请求
 * @param {String} url 接口地址
 * @param {Object} params 请求参数
 * @param config 其他配置参数
 * @returns {Promise<unknown>}
 */
const fetchPost = (url, params, config) => {
    return new Promise((resolve, reject) => {
        http.post(url, params, config).then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export {
    fetchGet,
    fetchPost
}
