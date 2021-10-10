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
        text-align: center;
        font-size: 22px;
        line-height: 40px;
        border-radius: 5px;
        @include background_color('background-color1');
        @include font_color('text-color2');
        @include box_shadow('box-shadow2');
    }
}

@media screen and (max-width: 720px) {
    .el-backtop {
        right: 20px !important;
    }
}
</style>
