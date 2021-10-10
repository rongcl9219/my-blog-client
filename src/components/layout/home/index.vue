<template>
    <div class="wrapper" :class="{'home-slide-on': getHomeAside}">
        <HomeHeader/>
        <HomeMain/>
        <HomeFooter/>
        <HomeAside/>
        <div class="aside-mask" @click="toggleHomeAside"></div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import HomeHeader from './Header'
import HomeMain from './Main'
import HomeFooter from './Footer'
import HomeAside from './HomeAside'
export default {
    name: "HomeLayout",
    components: {
        HomeHeader,
        HomeMain,
        HomeFooter,
        HomeAside
    },
    computed: {
        ...mapGetters('setting', [
            'getHomeAside'
        ])
    }
}
</script>

<style scoped lang="scss">
.aside-mask {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    @include background_color('background-color10');
}

@media screen and (max-width: 720px) {
    .home-slide-on .aside-mask {
        display: block;
    }
}

</style>
