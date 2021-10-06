import Vue from 'vue'

Vue.mixin({
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
            })
        }
    }
})
