<template>
    <header class="header">
        <div class="header_box">
            <router-link class="home-link" to="/"><h1>火星的青青草原</h1></router-link>
            <HeaderSlider/>
        </div>
    </header>
</template>

<script>
import HeaderSlider from "./components/Slider";
import {mapActions} from 'vuex'
export default {
    name: "HomeHeader",
    components: {
        HeaderSlider
    },
    methods: {
        ...mapActions('common', [
            'setWebInfo'
        ])
    },
    created() {
        this.setWebInfo().catch(() => {})
    }
}
</script>

<style scoped lang="scss">
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    padding: 15px 30px;
    box-sizing: border-box;
    z-index: 20;
    @include background_color('background-color1');
    @include box_shadow('box-shadow1');

    .header_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    .home-link {
        font-weight: 500;
        font-size: 22px;
        @include font_color('text-color2');

        h1 {
            font-weight: 600;
            @include font_color('text-color2');
        }
    }
}
</style>
