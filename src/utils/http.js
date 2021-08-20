import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
import {cacheAccessToken, cacheRefreshToken} from '@/utils/auth'
import router from '@/router/index'

const http = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000
})

// 添加请求拦截
http.interceptors.request.use(config => {
    // 请求头添加token
    if (cacheAccessToken.load()) {
        config.headers['authorization'] = `Bearer ${cacheAccessToken.load()}`
    }

    if (config.url === '/refreshToken') {
        config.headers['authorization'] = `Bearer ${cacheAccessToken.load()} ${cacheRefreshToken.load()}`
    }

    if (config.method === 'post') {
        if (config.headers['Content-Type'] && config.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1) {
            config.data = qs.stringify(config.data)
        }
    } else if (config.method === 'get') {
        // get请求添加时间戳
        config.params = {
            _: new Date().getTime(),
            ...config.params
        }
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 添加相应拦截器
http.interceptors.response.use(response => {
    if (!response.data.status) {
        if (response.data.code === -4001) {
            router.replace({path: '/403'})
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
