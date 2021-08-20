<template>
    <div>
        <div>{{ msg }}</div>
        <el-button @click="go">403</el-button>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'AdminMain',
    data () {
        return {
            msg: '后台首页'
        }
    },
    methods: {
        ...mapActions('user', [
            'refreshToken'
        ]),
        go () {
            this.$router.push({path: '/403'})
        }
    },
    created () {
        let _this = this
        setInterval(() => {
            _this.refreshToken().catch(() => {
            })
        }, 1000 * 60 * 8)
    }
}
</script>
