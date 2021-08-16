/**
 * 后台管理路由
 */

// 后台登录页面
const AdminLogin = () => import(/* webpackChunkName: "admin-login" */ '@/views/admin/login')

// 后台首页
const AdminMain = () => import(/* webpackChunkName: "admin-main" */ '@/views/admin/main')

export default [
    {
        path: '/login',
        name: 'AdminLogin',
        component: AdminLogin
    },
    {
        path: '/admin',
        name: 'AdminMain',
        component: AdminMain,
        meta: {
            requiresAuth: true
        }
    }
]
