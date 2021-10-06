<template>
    <nav class="header_tabs">
        <div class="tab_item">
            <router-link to="/" class="link-home">
                <i class="el-icon-s-home" :class="'HomePage' === activeRoute ? 'route-active' : ''"></i>
                <span>首页</span>
            </router-link>
        </div>
        <div class="tab_item">
            <router-link to="/classTag" :class="'ClassTag' === activeRoute ? 'route-active' : ''">
                <i class="el-icon-third-biaoqian"></i>
                <span>分类/标签</span>
            </router-link>
        </div>
        <div class="tab_item">
            <router-link to="/about" :class="'About' === activeRoute ? 'route-active' : ''">
                <i class="el-icon-user-solid"></i>
                <span>关于</span>
            </router-link>
        </div>
        <div class="tab_item">
            <router-link to="/timeLine" :class="'TimeLine' === activeRoute ? 'route-active' : ''">
                <i class="el-icon-third-shijian"></i>
                <span>时间线</span>
            </router-link>
        </div>
        <div class="tab_item">
            <router-link to="/search" :class="'Search' === activeRoute ? 'route-active' : ''">
                <i class="el-icon-search"></i>
                <span>搜索</span>
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: "LinkTab",
    computed: {
        activeRoute() {
            return this.$route.name
        }
    }
}
</script>

<style scoped lang="scss">
.header_tabs {
    display: flex;

    .tab_item {
        margin: 0 5px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;

        a {
            transition: .3s;
            padding: 2px 8px;
            color: $--color-text-secondary;
        }

        &:hover a, .route-active {
            color: $--color-text-primary;
        }

        i {
            margin-right: 3px;
            font-size: 16px;
        }
    }
}

.slider {
    .header_tabs {
        flex-direction: row;
        align-items: center;
    }
}

#homeAside {
    .header_tabs {
        flex-direction: column;

        .tab_item {
            font-size: 16px;
            font-weight: 600;
            line-height: 1;
            padding: 0 15px;
            margin: 10px 5px;
        }
    }
}

@media screen and (max-width: 720px) {
    .slider {
        .header_tabs {
            display: none;
        }
    }
}
</style>
