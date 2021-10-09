<template>
    <div>
        <button @click="setTheme('blove')">红色主题</button>
        <button @click="setTheme('flammulated')">蓝色主题</button>
        <hr />
        <h1 class="them_title">This is an about page</h1>
        <button class="them-btn-default">默认</button>
        <button class="them-btn-primary">主要</button>
        <button class="them-btn-info">提示</button>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: "About",
    methods: {
        ...mapActions('setting', [
            'setTheme'
        ])
    }
}
</script>

<style scoped>

</style>
