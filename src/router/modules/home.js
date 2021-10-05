/**
 * 首页路由
 */

// 首页
const HomePage = () => import(/* webpackChunkName: "home-page" */ '@/views/home/main')

const ArticlePreview = () => import(/* webpackChunkName: "article-preview" */ '@/views/common/ArticlePreview')

const HomeArticle = () => import(/* webpackChunkName: "home-article" */ '@/views/home/Article')

const ArticleList = () => import(/* webpackChunkName: "home-articleList" */ '@/views/home/ArticleList')

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
        path: '/article',
        name: 'HomeArticle',
        component: HomeArticle,
        props: (route) => ({ articleId: route.query.articleId }),
        meta: {
            home: true
        }
    },
    {
        path: '/articleList',
        name: 'ArticleList',
        component: ArticleList,
        props: (route) => ({ type: route.query.type, typeId: String(route.query.id) }),
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
