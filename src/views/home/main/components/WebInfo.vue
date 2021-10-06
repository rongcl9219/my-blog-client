<template>
    <div id="webInfo">
        <el-avatar class="avatar" :size="90" :src="webInfo && webInfo.WEB_AVATAR.url"></el-avatar>
        <h3 class="web_user" v-text="webInfo && webInfo.WEB_NAME"></h3>
        <p class="web_info" v-text="webInfo && webInfo.WEB_DESC"></p>
        <div class="web_menu_wrap">
            <div class="menu_item" @click="pathTo('/')">
                <p class="num" v-text="articleCount"></p>
                <p>文章</p>
            </div>
            <div class="menu_item" @click="pathTo('/classTag')">
                <p class="num" v-text="classList.length"></p>
                <p>分类</p>
            </div>
            <div class="menu_item" @click="pathTo('/classTag')">
                <p class="num" v-text="tagList.length"></p>
                <p>标签</p>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="class_box">
            <h4><i class="el-icon-third-fenleiguanli"></i>分类</h4>
            <ul class="class_ul">
                <li class="li_item" v-for="item in classList" :key="item.classId" @click="pathTo('/articleList', {type: 'class', id: item.classId})">
                    <span>{{ item.className }}</span>
                    <span :style="{backgroundColor: getBgColor()}">{{ item.count }}</span>
                </li>
            </ul>
        </div>
        <el-divider></el-divider>
        <h4><i class="el-icon-third-biaoqian"></i>标签</h4>
        <div class="tag_box">
            <span class="tag_item"
                  v-for="tag in tagList"
                  :key="tag.tagId"
                  :style="{backgroundColor: getBgColor()}"
                  @click="pathTo('/articleList', {type: 'tag', id: tag.tagId})">{{tag.tagName}}</span>
        </div>
    </div>
</template>

<script>
import {getAsideInfo} from '@/api/common'
export default {
    name: "WebInfo",
    props: {
        webInfo: {
            type: Object,
            default: function () {
                return null
            }
        }
    },
    data () {
        return {
            tagList: [],
            classList: [],
            articleCount: 0,
            colorList: ['#12a933', '#e32c2c', '#f58b30', '#fdb004', '#3dccd3', '#a000d3', '#d10074', '#27d984', '#226cb9', '#b36b6b']
        }
    },
    created() {
        getAsideInfo().then(res => {
            this.tagList = res.data.tagList
            this.classList = res.data.classList
            this.articleCount = res.data.articleCount
        }).catch(() => {})
    }
}
</script>

<style lang="scss">
#webInfo {
    position: sticky;
    top: 80px;
    width: 300px;
    height: fit-content;
    margin-left: 20px;
    padding: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: $box-shadow-light;
    overflow: hidden;
    transition: .3s;

    &:hover {
        box-shadow: $box-shadow-dark;
    }

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

    h4 {
        margin: 15px 0;
        color: $--color-text-regular;

        & > i {
            margin-right: 5px;
        }
    }

    .class_ul .li_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 15px 5px 10px;
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 2.2;
        border-radius: 3px;
        box-shadow: $box-shadow-light;
        cursor: pointer;
        transition: .3s;

        &:hover {
            transform: scale(1.02);
            box-shadow: $box-shadow-dark;
        }

        span:nth-child(2) {
            width: 22px;
            height: 22px;
            text-align: center;
            line-height: 22px;
            color: $--color-white;
            background-color: $--background-color-base;
            border-radius: 3px;
        }
    }

    .tag_box {
        display: flex;
        flex-wrap: wrap;
    }

    .tag_item {
        font-size: 12px;
        margin: 0 10px 15px 0;
        padding: 5px 10px;
        border-radius: 3px;
        color: $--color-white;
        line-height: 1;
        box-shadow: 0 2px 10px 1px rgba($--color-black, .1);
        cursor: pointer;
        transition: .3s;
    }
}
</style>
