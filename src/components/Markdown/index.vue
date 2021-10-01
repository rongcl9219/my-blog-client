<template>
    <mavon-editor :externalLink="externalLink" ref="md" id="editor" @imgAdd="imgAdd" v-model="context"/>
</template>

<script>
import md5 from 'js-md5'
import {getUuid} from '@/utils/tool'
import {getUploadToken, uploadImg} from '@/api/common'
import 'mavon-editor/dist/css/index.css'

export default {
    name: 'Markdown',
    props: {
        content: {
            type: String,
            default: ''
        }
    },
    watch: {
        content (newValue) {
            this.context = newValue
        }
    },
    data () {
        return {
            context: '',
            externalLink: {
                markdown_css: false,
                hljs_js: false,
                hljs_css: false,
                hljs_lang: false
            }
        }
    },
    methods: {
        imgAdd (pos, $file) {
            // 第一步.将图片上传到服务器.
            let formData = new FormData()
            let key = md5(getUuid())
            formData.append('file', $file, key)
            formData.append('key', key)

            getUploadToken({keys: key}).then(res => {
                let data = res.data[0]
                formData.append('token', data.token)

                uploadImg(formData).then(() => {
                    // 第二步.将返回的url替换到文本原位置
                    this.$refs['md'].$img2Url(pos, data.url)
                }).catch(() => {
                })
            })
        },
        getContent () {
            return this.context
        }
    }
}
</script>

<style lang="scss">
#editor {
    height: 100%;
}
</style>
