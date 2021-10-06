<template>
    <div class="slider">
        <div class="header_tabs">
            <div class="tab_item">
                <router-link to="/">
                    <i class="el-icon-s-home"></i>
                    <span>首页</span>
                </router-link>
            </div>
            <div class="tab_item">
                <router-link to="/classTag">
                    <i class="el-icon-third-biaoqian"></i>
                    <span>分类/标签</span>
                </router-link>
            </div>
            <div class="tab_item">
                <router-link to="/about">
                    <i class="el-icon-user-solid"></i>
                    <span>关于</span>
                </router-link>
            </div>
            <div class="tab_item">
                <router-link to="/timeLine">
                    <i class="el-icon-third-shijian"></i>
                    <span>时间线</span>
                </router-link>
            </div>
            <div class="tab_item">
                <router-link to="/search">
                    <i class="el-icon-search"></i>
                    <span>搜索</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Slider",
    computed: {
        activeTag () {
            return this.$route.path
        }
    },
    methods: {
        pathTo (path) {
            this.$router.push({
                path
            })
        }
    }
}
</script>

<style scoped lang="scss">
.header_tabs {
    display: flex;
    align-items: center;

    .tab_item {
        margin: 0 5px;
        //padding: 2px 8px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;

        a {
            transition: .3s;
            padding: 2px 8px;
            color: $--color-text-secondary;
        }

        &:hover a, .router-link-exact-active {
            color: $--color-text-primary;
        }

        i {
            margin-right: 3px;
            font-size: 16px;
        }
    }
}
</style>
