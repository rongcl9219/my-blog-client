<template>
    <div class="sidebar-container">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="defaultPath"
                :collapse="getSidebarOpen"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="false"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                :router="true"
                mode="vertical">
                <el-menu-item index="/admin/main" :class="{'submenu-title-noDropdown': getSidebarOpen}">
                    <i class="el-icon-third-shouye"></i>
                    <span slot="title">主页</span>
                </el-menu-item>
                <el-menu-item index="/admin/class" :class="{'submenu-title-noDropdown': getSidebarOpen}">
                    <i class="el-icon-third-fenleiguanli"></i>
                    <span slot="title">分类管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/tag" :class="{'submenu-title-noDropdown': getSidebarOpen}">
                    <i class="el-icon-third-biaoqian"></i>
                    <span slot="title">标签管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/article" :class="{'submenu-title-noDropdown': getSidebarOpen}">
                    <i class="el-icon-third-svgwrite"></i>
                    <span slot="title">文章管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/aboutMe" :class="{'submenu-title-noDropdown': getSidebarOpen}">
                    <i class="el-icon-third-xin"></i>
                    <span slot="title">关于我</span>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import variables from '@/assets/css/variables.scss'
export default {
    name: 'AideBar',
    computed: {
        ...mapGetters('setting', [
            'getSidebarOpen'
        ]),
        variables () {
            return variables
        },
        defaultPath: function () {
            return this.$route.path
        }
    }
}
</script>
