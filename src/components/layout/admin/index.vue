<template>
    <div :class="classObj" class="app-wrapper">
        <Side-Bar></Side-Bar>
        <div class="main-container">
            <div class="fixed-header">
                <Nav-Bar></Nav-Bar>
            </div>
            <App-Main></App-Main>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SideBar from './Sidebar'
import NavBar from './NavBar'
import AppMain from './AppMain'

export default {
    name: 'AdminLayout',
    components: {
        'Side-Bar': SideBar,
        'Nav-Bar': NavBar,
        'App-Main': AppMain
    },
    computed: {
        ...mapGetters('setting', ['getSidebarOpen']),
        classObj () {
            return {
                hideSidebar: this.getSidebarOpen,
                openSidebar: !this.getSidebarOpen
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixin.scss';
@import '~@/assets/scss/variables.scss';

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
        position: fixed;
        top: 0;
    }
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px)
}
</style>
