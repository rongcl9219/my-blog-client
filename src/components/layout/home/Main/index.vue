<template>
    <div class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key"/>
        </transition>
    </div>
</template>

<script>
export default {
    name: "HomeMain",
    computed: {
        key () {
            return this.$route.path
        }
    }
}
</script>

<style scoped lang="scss">
.app-main {
    padding: 60px 0 0 0;
}
</style>
