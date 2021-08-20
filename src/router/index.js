import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import {cacheAccessToken} from '@/utils/auth'

import routes from '@/router/modules/routers'

Vue.use(Router)

// 解决报错
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push (location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {x: 0, y: 0}
    }
})

// 路由拦截
router.beforeEach((to, from, next) => {
    const token = cacheAccessToken.load()
    NProgress.start()
    if (to.meta.requiresAuth) {
        if (token) {
            const userInfo = store.getters.name
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
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router
