<template>
    <aside id="homeAside">
        <WebInfo/>
        <div @click="toggleHomeAside"><LinkTab/></div>
        <el-divider></el-divider>
    </aside>
</template>

<script>
import {mapGetters} from 'vuex'
import WebInfo from '@/components/WebInfo'
import LinkTab from "@/components/layout/home/components/LinkTab";
export default {
    name: "HomeAside",
    components: {
        WebInfo,
        LinkTab
    },
    computed: {
        ...mapGetters('setting', [
            'getHomeAside'
        ])
    }
}
</script>

<style scoped lang="scss">
#homeAside {
    position: fixed;
    top: 0;
    left: 0;
    width: 230px;
    height: 100vh;
    padding-top: 60px;
    box-sizing: border-box;
    transform: translateX(-100%);
    transition: .3s;
    z-index: 15;
    @include background_color('background-color1');
}

@media screen and (max-width: 720px) {
    .home-slide-on #homeAside {
        transform: translateX(0);
    }
}
</style>
