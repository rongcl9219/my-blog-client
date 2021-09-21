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

export const uploadImg = formData => {
    return fetchPost('http://upload-z2.qiniup.com', {formData})
}
