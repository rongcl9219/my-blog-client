<template>
    <div class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key"/>
        </transition>
        <el-backtop :bottom="70" :visibility-height="300">
            <div class="to_top">
                <i class="el-icon-third-huojian"></i>
            </div>
        </el-backtop>
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
    min-height: calc(100vh - 130px);

    .el-backtop {
        box-shadow: none;
    }

    .to_top {
        width: 100%;
        height: 100%;
        background-color: $--color-white;
        text-align: center;
        font-size: 22px;
        line-height: 40px;
        color: $--color-black;
        box-shadow: $box-shadow-dark;
        border-radius: 5px;
    }
}

@media screen and (max-width: 720px) {
    .el-backtop {
        display: none !important;
    }
}
</style>
