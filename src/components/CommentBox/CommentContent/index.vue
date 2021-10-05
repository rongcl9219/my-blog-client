<template>
    <span class="comment_con">
        <template v-for="(item, index) in htmlArr">
            <span v-if="item.type === 1" :key="index" v-text="item.text"></span>
            <span v-else :key="index">
               <Svg-Comment :svgHtml="item.text"></Svg-Comment>
            </span>
        </template>
    </span>
</template>

<script>
import emojiData from '@/components/Emoji/emojiData'

export default {
    name: 'CommentContent',
    props: {
        html: String
    },
    components: {
        'Svg-Comment': {
            props: {
                svgHtml: String
            },
            render (h) {
                const com = this.extend({
                    template: `${this.svgHtml}`
                })
                return h(com, {})
            }
        }
    },
    data () {
        return {
            emojiData: emojiData,
            htmlArr: []
        }
    },
    created () {
        // 匹配 [] 之间的字符 包括[]
        let reg = /\[[^[]+]/g
        let svgArr = this.html.match(reg)
        let textArr = this.html.split(reg)
        let svgIndex = 0
        textArr.forEach((text) => {
            let obj = {
                type: 1,
                text: ''
            }
            try {
                if (!text) {
                    let key = svgArr[svgIndex].replace(/(\[)|]/g, '')

                    if (emojiData[key]) {
                        obj.type = 2
                        obj.text = `<svg-icon icon-class="${emojiData[key]}"></svg-icon>`
                    } else {
                        obj.text = svgArr[svgIndex]
                    }

                    svgIndex++
                } else {
                    obj.text = text
                }
            } catch (e) {
                obj.text = text
            }
            this.htmlArr.push(obj)
        })
    }
}
</script>
