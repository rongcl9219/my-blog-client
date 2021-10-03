/**
 * 后台管理路由
 */

// 后台登录页面
const AdminLogin = () => import(/* webpackChunkName: "admin-login" */ '@/views/admin/login')

const AdminLayout = () => import(/* webpackChunkName: "admin-layout" */ '@/components/layout/admin')

// 后台首页
const AdminMain = () => import(/* webpackChunkName: "admin-main" */ '@/views/admin/main')

const AdminClass = () => import(/* webpackChunkName: "admin-class" */ '@/views/admin/class')

const AdminTag = () => import(/* webpackChunkName: "admin-tag" */ '@/views/admin/tag')

const AdminArticle = () => import(/* webpackChunkName: "admin-article" */ '@/views/admin/article')

const AdminAbout = () => import(/* webpackChunkName: "admin-about" */ '@/views/admin/about')

export default [
    {
        path: '/login',
        name: 'AdminLogin',
        component: AdminLogin
    },
    {
        path: '/admin',
        name: 'AdminLayout',
        component: AdminLayout,
        redirect: {
            name: 'AdminMain'
        },
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'main',
                name: 'AdminMain',
                component: AdminMain,
                meta: {
                    requiresAuth: true,
                    title: '主页'
                }
            },
            {
                path: 'class',
                name: 'AdminClass',
                component: AdminClass,
                meta: {
                    requiresAuth: true,
                    title: '分类'
                }
            },
            {
                path: 'tag',
                name: 'AdminTag',
                component: AdminTag,
                meta: {
                    requiresAuth: true,
                    title: '标签'
                }
            },
            {
                path: 'article',
                name: 'AdminArticle',
                component: AdminArticle,
                meta: {
                    requiresAuth: true,
                    title: '文章'
                }
            },
            {
                path: 'about',
                name: 'AdminAbout',
                component: AdminAbout,
                meta: {
                    requiresAuth: true,
                    title: '关于'
                }
            }
        ]
    }
]
