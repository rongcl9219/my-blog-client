<template>
    <footer class="footer">
        <p>本站由 @RongCL 创建 - © 2020. <a href="http://beian.miit.gov.cn/" target="_blank">京ICP备2020038858号-1</a></p>
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
    background-color: #262a30;
    color: #999;
    font-size: 14px;

    p {
        line-height: 1.5;
    }

    a {
        color: #999;
        font-size: 14px;
    }

    a:hover {
        color: #fff;
    }
}
</style>
