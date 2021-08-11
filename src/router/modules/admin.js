/**
 * 后台管理路由
 */

// 后台登录页面
const AdminLogin = () => import(/* webpackChunkName: "admin-login" */ '@/views/admin/login')

export default [
    {
        path: '/login',
        name: 'AdminLogin',
        component: AdminLogin
    }
]
