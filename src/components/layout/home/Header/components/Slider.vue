<template>
    <div class="slider">
        <div class="header_tabs">
            <div class="tab_item" @click="pathTo('/home')">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
            </div>
            <div class="tab_item" @click="pathTo('/classAndTag')">
                <i class="el-icon-third-biaoqian"></i>
                <span>分类/标签</span>
            </div>
            <div class="tab_item" @click="pathTo('/about')">
                <i class="el-icon-user-solid"></i>
                <span>关于</span>
            </div>
            <div class="tab_item" @click="pathTo('/timeLine')">
                <i class="el-icon-menu"></i>
                <span>时间线</span>
            </div>
            <div class="tab_item" @click="pathTo('/search')">
                <i class="el-icon-search"></i>
                <span>搜索</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Slider"
}
</script>

<style scoped lang="scss">
.header_tabs {
    display: flex;
    align-items: center;

    .tab_item {
        margin: 0 5px;
        padding: 2px 8px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        color: #898989;
        transition: .3s;

        & > i {
            margin-right: 3px;
            font-size: 16px;
        }
    }
}
</style>
