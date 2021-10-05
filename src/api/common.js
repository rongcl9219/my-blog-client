import {fetchGet, fetchPost} from '@/utils/http'

/**
 * 获取登录验证码
 * @returns {*}
 */
export const getValidCode = () => {
    return fetchGet('/validCode')
}

/**
 * 刷新token
 * @returns {Promise<*>}
 */
export const refreshToken = () => {
    return fetchPost('/refreshToken')
}

/**
 * 获取上传token
 * @param keys
 * @param thumbnail
 * @returns {*}
 */
export const getUploadToken = ({keys, thumbnail}) => {
    return fetchPost('/getUploadToken', {keys, thumbnail})
}

/**
 * 上传图片
 * @param formData
 * @returns {*}
 */
export const uploadImg = function (formData) {
    return fetchPost('http://upload-z2.qiniup.com', formData)
}

/**
 * 获取侧边栏信息
 * @returns {Promise<*>}
 */
export const getAsideInfo = () => {
    return fetchGet('/getAsideInfo')
}

/**
 * 添加评论
 * @param data
 * @returns {Promise<*>}
 */
export const addComment = (data) => {
    return fetchPost('/addComment', data)
}

/**
 * 获取评论
 * @param articleId
 * @returns {Promise<*>}
 */
export const getComment = articleId => {
    return fetchGet('/getComment', {articleId})
}
