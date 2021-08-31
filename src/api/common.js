import {fetchGet, fetchPost} from '@/utils/http'

/**
 * 获取登录验证码
 * @returns {*}
 */
export const getValidCode = () => {
    return fetchGet('/validCode')
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
