import Vue from 'vue'
import store from "@/store";

import NoData from '@/components/NoData'
Vue.mixin({
    components: {
        NoData
    },
    methods: {
        getBgColor () {
            const colorList = ['#12a933', '#e32c2c', '#f58b30', '#fdb004', '#3dccd3', '#a000d3', '#d10074', '#147c4b', '#226cb9', '#b36b6b']
            const index = Math.floor(Math.random() * 10)

            return colorList[index]
        },
        pathTo (path, query) {
            this.$router.push({
                path: path,
                query: query
            }).then(() => {})
        },
        toggleHomeAside () {
            store.dispatch('setting/toggleHomeAside').then(() => {})
        },
        pageScrollTo(topHeight) {
            topHeight = topHeight || 0
            return new Promise((resolve => {
                window.scrollTo({
                    top: topHeight,
                    behavior: "smooth"
                })

                let running = function () {
                    let top = window.scrollY
                    if (top === topHeight) {
                        window.removeEventListener("scroll", running)
                        resolve()
                    }
                }
                window.addEventListener("scroll", running, false)
            }))
        }
    }
})
