import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
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
    const token = getToken()
    NProgress.start()
    if (to.meta.requiresAuth) {
        if (token) {
            const userInfo = store.getters.name
            if (userInfo) {
                next()
            } else {
                store.dispatch('user/getUserInfo').finally(() => {
                    next()
                })
            }
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router
