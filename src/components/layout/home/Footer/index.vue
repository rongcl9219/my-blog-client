<template>
    <footer class="footer">
        <p>本站由 @RongCL 创建 - © 2021. <a href="http://beian.miit.gov.cn/" target="_blank">皖ICP备2021014369号-1</a></p>
    </footer>
</template>

<script>
export default {
    name: "HomeFooter"
}
</script>

<style scoped lang="scss">
.footer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    text-align: center;
    font-size: 14px;
    border-top: 1px solid;
    box-sizing: border-box;
    @include border_color('border-color2');
    @include background_color('background-color1');
    @include font_color('text-color2');

    p {
        line-height: 1.5;
    }

    a {
        font-size: 14px;
        @include font_color('text-color2');
    }
}
</style>
