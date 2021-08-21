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
    return fetchGet('/admin/getUserInfo')
}

/**
 * 退出登录
 * @returns {*}
 */
export const loginOut = () => {
    return fetchPost('/loginOut')
}

/**
 * 刷新token
 * @returns {Promise<*>}
 */
export const refreshToken = () => {
    return fetchPost('/refreshToken')
}

/**
 * 修改密码
 * @param oldPass 旧密码
 * @param newPass 新密码
 * @param checkPass 确认密码
 * @returns {*}
 */
export const updatePassword = ({oldPass, newPass, checkPass}) => {
    return fetchPost('/admin/updatePassword', {oldPass, newPass, checkPass})
}
