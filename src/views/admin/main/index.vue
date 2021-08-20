<template>
    <div>
        <div>{{msg}}</div>
        <el-button @click="go">403</el-button>
    </div>
</template>

<script>
export default {
    name: 'AdminMain',
    data () {
        return {
            msg: '后台首页'
        }
    },
    methods: {
        go () {
            this.$router.push({path: '/403'})
        }
    }
}
</script>
