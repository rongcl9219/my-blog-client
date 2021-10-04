<template>
    <header class="header">
        <router-link class="home-link" to="/"><h1>火星的青青草原</h1></router-link>
        <HeaderSlider/>
    </header>
</template>

<script>
import HeaderSlider from "./components/Slider";
export default {
    name: "HomeHeader",
    components: {
        HeaderSlider
    }
}
</script>

<style scoped lang="scss">

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 15px 30px;
    box-sizing: border-box;
    background-color: $--color-white;
    box-shadow: 0 1px 8px 0 rgba($--color-black, 0.1);
    z-index: 99999;

    .home-link {
        color: $--color-text-primary;
        font-weight: 500;
        font-size: 22px;

        h1 {
            font-weight: 600;
        }
    }
}
</style>
