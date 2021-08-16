import {fetchGet} from '@/utils/http'

/**
 * 获取登录验证码
 * @returns {*}
 */
export const getValidCode = () => {
    return fetchGet('/validCode')
}
