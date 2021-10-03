/**
 * 首页路由
 */

// 首页
const HomePage = () => import(/* webpackChunkName: "home-page" */ '@/views/home/main')

const ArticlePreview = () => import(/* webpackChunkName: "article-preview" */ '@/views/common/ArticlePreview')

export default [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
        meta: {
            home: true
        }
    },
    {
        path: '/articlePreview',
        name: 'ArticlePreview',
        component: ArticlePreview,
        props: (route) => ({ articleId: route.query.articleId })
    }
]
