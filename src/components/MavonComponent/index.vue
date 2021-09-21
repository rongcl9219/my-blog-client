<template>
    <div id="mavonEditor">
        <el-dialog
            title="编辑文章内容"
            :visible.sync="mavonEditorVisible"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            :show-close="false"
            :center="true"
            :fullscreen="true"
            :lock-scroll="true"
            @open="onOpen"
            width="100%">
            <mavon-editor ref="md" id="editor" @imgAdd="imgAdd" v-model="context"/>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeEditorContentDialog">取 消</el-button>
                <el-button type="primary" @click="makeSure(false)"
                           v-loading="loading">
                    {{ loading ? '保存中...' : '保 存' }}
                </el-button>
                <el-button type="primary" @click="makeSure(true)"
                           v-loading="loading">
                    {{ loading ? '保存中...' : '保存并返回' }}
                </el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import {getUploadToken, uploadImg} from '@/api/common'
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    name: 'MavonComponent',
    props: {
        mavonEditorVisible: {
            type: Boolean,
            default: false
        },
        articleId: {
            type: String,
            default: ''
        }
    },
    components: {
        'mavon-editor': mavonEditor
    },
    data () {
        return {
            id: '',
            context: '', // 输入的数据
            loading: false
        }
    },
    methods: {
        closeEditorContentDialog () {
            this.id = ''
            this.context = ''
            this.$emit('update:mavonEditorVisible', false)
        },
        makeSure (isReturn) {
            let _this = this
            let data = {
                articleId: _this.id,
                articledContent: _this.context
            }
            _this.$post('/admin/article/saveContent', data).then(res => {
                if (res.code === 200) {
                    _this.$message.success('修改成功')
                    if (isReturn) {
                        _this.closeEditorContentDialog()
                    }
                } else {
                    _this.$message.error('修改失败')
                }
            }).then(() => {
            })
        },
        onOpen () {
            let _this = this
            _this.id = _this.articleId
            _this.$get('/admin/article/getContent', {articleId: _this.id}).then(res => {
                if (res.code === 200) {
                    _this.context = res.data.articleContent || ''
                } else {
                    _this.$message.error('获取内容失败')
                }
            }).catch(() => {
            })
        },
        imgAdd (pos, $file) {
            let _this = this
            // 第一步.将图片上传到服务器.
            let formData = new FormData()
            let key = _this.$md5(new Date().getTime().toString())
            formData.append('file', $file, key)
            formData.append('key', key)

            getUploadToken({keys: key}).then(res => {
                let data = res.data[0]
                formData.append('token', data.token)

                uploadImg(formData).then(() => {
                    // 第二步.将返回的url替换到文本原位置
                    _this.$refs['md'].$img2Url(pos, data.url)
                }).catch(() => {
                })
            })
        }
    }
}
</script>

<style lang="scss">
#mavonEditor {
    .el-dialog__body {
        height: calc(100vh - 180px);

        #editor {
            height: 100%;
        }
    }
}
</style>
