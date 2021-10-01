<template>
    <div
        class="ValidCode disabled-select"
        :style="`width:${width}; height:${height}`"
        @click="getCode"
    >
    <span
        v-for="(item, index) in codeList"
        :key="index"
        :style="getStyle(item)">{{ item.code }}</span>
    </div>
</template>

<script>
import {getValidCode} from '@/api/common'

export default {
    name: 'ValidCode',
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        width: {
            type: String,
            default: '150px'
        },
        height: {
            type: String,
            default: '40px'
        },
        length: {
            type: Number,
            default: 4
        },
        refresh: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            codeList: []
        }
    },
    watch: {
        refresh () {
            this.getCode()
        }
    },
    mounted () {
        this.getCode()
    },
    methods: {
        getCode () {
            let _this = this
            getValidCode().then((res) => {
                if (res.code === 200) {
                    _this.createdCode(res.data.validCode)
                }
            }).catch(() => {
            })
        },
        createdCode (codeArr) {
            let codeList = []
            // 生成
            codeArr.forEach(code => {
                const rgb = [
                    Math.round(Math.random() * 220),
                    Math.round(Math.random() * 240),
                    Math.round(Math.random() * 200)
                ]
                codeList.push({
                    code: code,
                    color: `rgb(${rgb})`,
                    fontSize: `${10 + (+[Math.floor(Math.random() * 10)] + 6)}px`,
                    padding: `${[Math.floor(Math.random() * 10)]}px`,
                    transform: `rotate(${Math.floor(Math.random() * 90) -
                    Math.floor(Math.random() * 90)}deg)`
                })
            })
            // 指向
            this.codeList = codeList
            // 将当前数据派发出去
            this.$emit('input', codeList.map(item => item.code).join(''))
        },
        getStyle (data) {
            return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
        }
    }
}
</script>

<style scoped>
.ValidCode {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 150px;
    background-color: rgba(204, 204, 204, .3);
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
}

.ValidCode span {
    display: inline-block;
}
</style>
