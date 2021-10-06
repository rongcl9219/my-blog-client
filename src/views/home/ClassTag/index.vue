<template>
    <div id="classAndTag">
        <h3><i class="el-icon-third-fenleiguanli"></i>分类</h3>
        <div class="item_module">
            <template v-for="classItem in classList">
                <div class="class_item"
                     :key="classItem.classId"
                     @click="pathTo('/articleList', {type: 'class', id: classItem.classId})">
                    <span v-text="classItem.className"></span>
                    <span class="class_count" :style="{backgroundColor: getBgColor()}"><span v-text="classItem.count"></span></span>
                </div>
            </template>
        </div>
        <h3><i class="el-icon-third-biaoqian"></i>标签</h3>
        <div class="item_module">
            <div class="tag_item" v-for="tagItem in tagList" :key="tagItem.tagId" @click="pathTo('/articleList', {type: 'tag', id: tagItem.tagId})">
                <span v-text="tagItem.tagName" :style="{color: getBgColor()}"></span>
            </div>
        </div>
    </div>
</template>

<script>
import {getClass} from '@/api/class'
import {getAllTag} from '@/api/tag'
export default {
    name: "ClassTag",
    data () {
        return {
            classList: [],
            tagList: []
        }
    },
    methods: {
        pathTo (path, query) {
            this.$router.push({
                path: path,
                query: query
            })
        }
    },
    created() {
        getClass().then(res => {
            this.classList = res.data
        }).catch(() => {})

        getAllTag().then(res => {
            this.tagList = res.data
        }).catch(() => {})
    }
}
</script>

<style lang="scss" scoped>
#classAndTag {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px 0;

    h3 {
        margin-top: 60px;
        text-align: center;
        font-size: 22px;

        & > i {
            margin-right: 5px;
        }
    }

    .item_module {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 10px 0 20px 0;
    }

    .class_item {
        padding: 5px 15px;
        border: 1px solid $--color-white;
        margin: 5px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        line-height: 2;
        color: $--color-text-primary;
        box-shadow: $box-shadow-light;
        cursor: pointer;
        transition: .3s;

        .class_count {
            display: inline-block;
            width: 22px;
            height: 22px;
            margin-left: 4px;
            text-align: center;
            line-height: 22px;
            color: $--color-white;
            background-color: $--background-color-base;
            border-radius: 3px;
            font-size: 13px;
            transition: .3s;
        }

        &:hover {
            color: $--color-white;
            background-color: $--color-black;
        }
    }

    .tag_item {
        position: relative;
        padding: 3px;
        margin: 5px;
        cursor: pointer;
        color: #999;
        font-weight: 600;
        transition: .3s;

        & > span {
            text-shadow: 2px 2px 1px rgba($--color-black, .15);
        }

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #222;
            transform: scaleX(0);
            transition: .3s;
        }

        &:hover {
            color: #222;

            &:after {
                transform: scaleX(1);
            }
        }
    }
}
</style>
