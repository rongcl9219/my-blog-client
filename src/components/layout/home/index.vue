<template>
    <div class="wrapper">
        <HomeHeader/>
        <HomeMain/>
        <HomeFooter/>
    </div>
</template>

<script>
import HomeHeader from './Header'
import HomeMain from './Main'
import HomeFooter from './Footer'
export default {
    name: "HomeLayout",
    components: {
        HomeHeader,
        HomeMain,
        HomeFooter
    }
}
</script>

<style scoped>

</style>
