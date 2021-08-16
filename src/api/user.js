import {fetchPost, fetchGet} from '@/utils/http'

/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 * @returns {Promise<*>}
 */
export const login = ({username, password}) => {
    return fetchPost('/login', {username, password})
}

/**
 * 获取用户信息
 * @returns {*}
 */
export const getUserInfo = () => {
    return fetchGet('/getUserInfo')
}

/**
 * 退出登录
 * @returns {*}
 */
export const loginOut = () => {
    return fetchPost('/loginOut')
}
