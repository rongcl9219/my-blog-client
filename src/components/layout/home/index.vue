<template>
    <div class="wrapper">
        <HomeHeader/>
        <HomeMain/>
    </div>
</template>

<script>
import HomeHeader from './Header'
import HomeMain from './Main'
export default {
    name: "HomeLayout",
    components: {
        HomeHeader,
        HomeMain
    }
}
</script>

<style scoped>

</style>
