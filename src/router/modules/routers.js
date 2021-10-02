/**
 * 组合全部路由
 */

// 前台页面
import HomeRouters from  './home'
// 后台页面
import AdminRouters from './admin'

let routes = [
    ...HomeRouters,
    ...AdminRouters,
    {
        path: '/403',
        name: '403',
        component: () => import(/* webpackChunkName: "403" */ '@/views/403.vue')
    },
    {
        path: '*',
        name: '404',
        component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
    }
]

/**
 * 将路由数组抹平
 * 可以快速查询某个指定路由
 * @param {import('vue-router').RouteConfig[]} routes
 * @returns
 */
const flatten = (routes) => {
    let result = []
    routes.forEach(route => {
        if (route && route.children && route.children.length) {
            result.push(route) // 原有的也加上
            result = result.concat(flatten(route.children))
        } else {
            result.push(route)
        }
    })
    return result
}

routes.flatten = function () {
    return flatten(this)
}

export default routes
