import {fetchGet, fetchPost} from '@/utils/http'

/**
 * 获取文章列表
 * @param page
 * @param pageSize
 * @param query
 * @param classType
 * @param tagType
 * @param articleStatus
 * @returns {*}
 */
export const getArticleList = ({page, pageSize, query, classType, tagType, articleStatus}) => {
    return fetchGet('/getArticleList', {page, pageSize, query, classType, tagType, articleStatus})
}

/**
 * 获取文章信息
 * @param articleId
 * @returns {*}
 */
export const getArticleInfo = articleId => {
    return fetchGet('/getArticleInfo', {articleId})
}

/**
 * 获取文章内容
 * @param articleId
 * @returns {*}
 */
export const getContent = articleId => {
    return fetchGet('/getContent', {articleId})
}

/**
 * 新增文章
 * @param articleInfo
 * @returns {*}
 */
export const newArticle = articleInfo => {
    return fetchPost('/admin/newArticle', articleInfo)
}

/**
 * 编辑文章基础信息
 * @param articleInfo
 * @returns {*}
 */
export const editArticle = articleInfo => {
    return fetchPost('/admin/editArticle', articleInfo)
}

/**
 * 保存文章内容
 * @param articleId
 * @param articledContent
 * @returns {*}
 */
export const saveContent = ({articleId, articledContent}) => {
    return fetchPost('/admin/saveContent', {articleId, articledContent})
}

/**
 * 删除文章(假删)
 * @param articleId
 * @returns {*}
 */
export const deleteArticle = articleId => {
    return fetchGet('/admin/deleteArticle', {articleId})
}

/**
 * 恢复文章
 * @param articleId
 * @returns {*}
 */
export const recoverArticle = articleId => {
    return fetchGet('/admin/recoverArticle', {articleId})
}

/**
 * 修改文章发布状态
 * @param articleId
 * @param isPublish
 * @returns {*}
 */
export const updatePublish = ({articleId, isPublish}) => {
    return fetchGet('/admin/updatePublish', {articleId, isPublish})
}
