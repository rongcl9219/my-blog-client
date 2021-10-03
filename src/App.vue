<template>
    <div id="app">
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
export default {
    name: 'App',
    components: {
        HomeLayout
    },
    mounted() {
        window.document.documentElement.setAttribute( "data-theme", "dark" );
    }
}
</script>
