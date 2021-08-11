import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

import resetMessage from '@/utils/resetMessage'

Vue.use(ElementUI)
Vue.prototype.$message = resetMessage

Vue.config.productionTip = false

let vm = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

Vue.use({ vm })
