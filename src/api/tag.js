import {fetchGet, fetchPost} from '@/utils/http'

/**
 * 获取标签列表
 * @returns {*}
 */
export const getTagList = ({page, pageSize}) => {
    return fetchGet('/admin/getTagList', {page, pageSize})
}

/**
 * 新增标签
 * @param tagName
 * @param classType
 * @param tagDesc
 * @returns {*}
 */
export const newTag = ({tagName, classType, tagDesc}) => {
    return fetchPost('/admin/newTag', {tagName, classType, tagDesc})
}

/**
 * 修改标签
 * @param tagId
 * @param tagName
 * @param classType
 * @param tagDesc
 * @returns {*}
 */
export const updateTag = ({tagId, tagName, classType, tagDesc}) => {
    return fetchPost('/admin/updateTag', {tagId, tagName, classType, tagDesc})
}

/**
 * 删除标签
 * @param tagId
 * @returns {*}
 */
export const deleteTag = ({tagId}) => {
    return fetchPost('/admin/deleteTag', {tagId})
}

/**
 * 获取标签信息
 * @param tagId
 * @returns {*}
 */
export const getTagInfo = ({tagId}) => {
    return fetchGet('/admin/getTagInfo', {tagId})
}
