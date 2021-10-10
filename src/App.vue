<template>
    <div id="app" :class="themeClass">
        <template v-if="$route.meta.home">
            <HomeLayout/>
        </template>
        <template v-else>
            <router-view :key="$route.path"/>
        </template>
    </div>
</template>

<script>
import HomeLayout from '@/components/layout/home'
import {mapGetters} from 'vuex'
export default {
    name: 'App',
    components: {
        HomeLayout
    },
    computed: {
        ...mapGetters('setting', [
            'getTheme'
        ]),
        themeClass () {
            return `theme-${this.getTheme}`
        }
    }
}
</script>


