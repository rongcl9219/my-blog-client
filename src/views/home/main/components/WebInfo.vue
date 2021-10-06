<template>
    <div id="webInfo">
        <WebInfo class="home-web-info" />
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
import {getClass} from '@/api/class'
import {getAllTag} from '@/api/tag'
import WebInfo from '@/components/WebInfo'

export default {
    name: "HomeWebInfo",
    components: {
        WebInfo
    },
    data () {
        return {
            tagList: [],
            classList: []
        }
    },
    created() {
        getClass().then(res => {
            this.classList = res.data
        })

        getAllTag().then(res => {
            this.tagList = res.data
        })
    }
}
</script>

<style scoped lang="scss">
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

@media screen and (max-width: 720px) {
    #webInfo {
        position: relative;
        top: 0;
        width: auto;
        margin: 20px 0;
        .home-web-info {
            display: none;
        }
    }
}
</style>
