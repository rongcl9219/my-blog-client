<template>
    <div>
        <el-avatar class="avatar" :size="90" :src="webInfo.WEB_AVATAR && webInfo.WEB_AVATAR.url"></el-avatar>
        <h3 class="web_user" v-text="webInfo.WEB_NAME"></h3>
        <p class="web_info" v-text="webInfo.WEB_DESC"></p>
        <div class="web_menu_wrap" @click="toggleHomeAside">
            <div class="menu_item" @click="pathTo('/')">
                <p class="num" v-text="getWebInfo.articleCount"></p>
                <p>文章</p>
            </div>
            <div class="menu_item" @click="pathTo('/classTag')">
                <p class="num" v-text="getWebInfo.classCount"></p>
                <p>分类</p>
            </div>
            <div class="menu_item" @click="pathTo('/classTag')">
                <p class="num" v-text="getWebInfo.tagCount"></p>
                <p>标签</p>
            </div>
        </div>
        <el-divider></el-divider>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: "WebInfo",
    computed: {
        ...mapGetters('common', [
            'getWebInfo'
        ]),
        webInfo () {
            return this.getWebInfo.webInfo || {}
        }
    }
}
</script>

<style scoped lang="scss">
.avatar {
    display: block;
    margin: 30px auto 20px;
}

.web_user, .web_info {
    text-align: center;
    font-size: 16px;
    color: $--color-text-primary;
    margin-bottom: 10px;
}

.web_menu_wrap {
    display: flex;
    justify-content: center;
    align-items: center;

    .menu_item {
        padding: 5px 15px;
        text-align: center;
        color: $--color-text-primary;
        cursor: pointer;
        transition: .3s;

        &:hover {
            color: $--color-primary;
        }

        &:nth-child(2) {
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
        }
    }

    .num {
        margin-bottom: 5px;
        font-size: 18px;
        font-weight: 600;
    }
}
</style>
