import {fetchGet, fetchPost} from '@/utils/http'

/**
 * 获取网站信息
 * @returns {*}
 */
export const getWebInfo = () => {
    return fetchGet('/admin/getWebInfo')
}

/**
 * 保存网站信息
 * @param paramObj
 * @returns {*}
 */
export const saveWebInfo = paramObj => {
    return fetchPost('/admin/saveWebInfo', {paramObj})
}
