<template>
    <div class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key"/>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'AdminAppMain',
    computed: {
        key () {
            return this.$route.path
        }
    }
}
</script>

<style scoped>
.app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
}

.fixed-header + .app-main {
    box-sizing: border-box;
    padding: 65px 15px 15px;
}
</style>
