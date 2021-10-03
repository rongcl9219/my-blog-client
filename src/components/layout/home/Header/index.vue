<template>
    <header class="header">
        <router-link class="home-link" to="/"><h1>My Blog</h1></router-link>
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

    .home-link {
        color: #424242;
        font-weight: 500;
        font-size: 22px;
    }
}
</style>
