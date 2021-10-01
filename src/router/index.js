import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

import routes from '@/router/modules/routers'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior () {
        // return 期望滚动到哪个的位置
        return {x: 0, y: 0}
    }
})

// 路由拦截
router.beforeEach((to, from, next) => {
    const token = store.state.common.token
    NProgress.start()
    if (to.meta.requiresAuth) {
        if (token) {
            const userInfo = store.state.user.username
            if (userInfo) {
                next()
            } else {
                store.dispatch('user/getUserInfo').then(() => {
                    next()
                }).catch(() => {
                    next()
                })
            }
        } else {
            next({
                path: '/login',
                replace: true
            })
        }
    } else {
        next()
    }
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
