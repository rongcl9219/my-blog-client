import {fetchGet, fetchPost} from '@/utils/http'

/**
 * 获取分类列表
 * @returns {*}
 */
export const getClassList = ({page, pageSize}) => {
    return fetchGet('/admin/getClassList', {page, pageSize})
}

/**
 * 新增分类
 * @param classCode
 * @param className
 * @param classType
 * @param classDesc
 * @returns {*}
 */
export const newClass = ({classCode, className, classType, classDesc}) => {
    return fetchPost('/admin/newClass', {classCode, className, classType, classDesc})
}

/**
 * 修改分类
 * @param classId
 * @param classCode
 * @param className
 * @param classType
 * @param classDesc
 * @returns {*}
 */
export const updateClass = ({classId, classCode, className, classType, classDesc}) => {
    return fetchPost('/admin/updateClass', {classId, classCode, className, classType, classDesc})
}

/**
 * 删除分类
 * @param classId
 * @returns {*}
 */
export const deleteClass = ({classId}) => {
    return fetchPost('/admin/deleteClass', {classId})
}

/**
 * 获取分类信息
 * @param classId
 * @returns {*}
 */
export const getClassInfo = ({classId}) => {
    return fetchGet('/admin/getClassInfo', {classId})
}

/**
 * 获取全部分类
 * @returns {*}
 */
export const getAllClass = () => {
    return fetchGet('/admin/getAllClass')
}
