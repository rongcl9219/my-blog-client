import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getToken } from '@/utils/auth'

import routes from '@/router/modules/routers'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { x: 0, y: 0 }
    }
})

// 路由拦截
router.beforeEach((to, from, next) => {
    let token = getToken()
    let path = to.path
    NProgress.start()
    if (to.meta.requiresAuth && path.indexOf('/admin/') > -1) {
        if (token) {
            next()
        } else {
            // store.dispatch('user/loginOut').then(() => {
            next({
                path: '/login'
            })
            // })
        }
    } else {
        // store.dispatch('user/loginOut').then(() => {
        next()
        // })
    }
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router
