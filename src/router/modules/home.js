/**
 * 首页路由
 */

// 首页
const HomePage = () => import(/* webpackChunkName: "home-page" */ '@/views/home/main')

export default [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    }
]
