import Vue from 'vue'
import App from './App'
import {sync} from 'vuex-router-sync'
import router from './router'
import ElementUI from 'element-ui'
import store from '@/store/index'

import resetMessage from '@/utils/resetMessage'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.scss'
import '../static/icon/iconfont.css'

Vue.use(ElementUI)
Vue.prototype.$message = resetMessage

Vue.config.productionTip = false

sync(store, router)

let vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

Vue.use({vm})
