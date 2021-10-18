<template>
    <div class="no_data">
        <img src="@/assets/images/default_img/no_data.png" alt="">
        <p>什么都没有</p>
    </div>
</template>

<script>
export default {
    name: "NoData"
}
</script>

<style scoped lang="scss">
.no_data {
    margin-top: 7%;
    text-align: center;

    p {
        font-size: 20px;
        @include font_color('text-color2');
    }
}
</style>
