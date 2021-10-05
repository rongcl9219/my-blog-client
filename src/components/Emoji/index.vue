<template>
    <el-popover
        placement="bottom-end"
        :append-to-body="false"
        v-model="visible"
        trigger="manual">
        <div class="comment_img_box">
            <div class="emoji_module">
                <ul class="emoji_box">
                    <li class="emoji_item" v-for="(icon, key, index) in emojiArr" :key="index">
                        <span @click="handleItem(key)"><svg-icon :icon-class="icon"></svg-icon></span>
                    </li>
                </ul>
            </div>
        </div>
        <el-button slot="reference"
                   class="input_icon"
                   size="mini"
                   type="primary"
                   circle
                   icon="el-icon-third-biaoqing"
                   @click.stop="visible = !visible">
        </el-button>
    </el-popover>
</template>

<script>
import emojiArr from './emojiData'

export default {
    name: "Emoji",
    props: {
        handleSvgItem: {
            type: Function,
            default: null
        }
    },
    data () {
        return {
            emojiArr,
            visible: false
        }
    },
    methods: {
        handleItem (key) {
            this.visible = false
            if (this.handleSvgItem) {
                this.handleSvgItem(`[${key}]`)
            }
        },
        closeModule() {
            this.visible = false
        }
    },
    created () {
        document.body.addEventListener('click', this.closeModule)
    },
    destroyed() {
        this.visible = false
        document.body.addEventListener('click', this.closeModule)
    }
}
</script>

<style scoped lang="scss">
.emoji_module {
    width: 240px;
    height: 200px;
    overflow: auto;

    /*修改滚动条样式*/
    &::-webkit-scrollbar {
        width: 0px;
        height: 7px;
    }

    &::-webkit-scrollbar-track {
        background: rgb(239, 239, 239);
        border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
        background: #bfbfbf;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #333;
    }
}

.emoji_box {
    display: flex;
    flex-wrap: wrap;

    .emoji_item {
        font-size: 30px;
        padding: 5px;
        line-height: 1;

        span {
            display: inline-block;
            cursor: pointer;
        }
    }
}
.input_icon {
    position: absolute;
    bottom: 22px;
    right: 10px;
    width: 22px;
    height: 22px;
    padding: 0;
}
</style>
