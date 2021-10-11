<template>
    <div>
        <el-dialog
            title="图片上传"
            :visible.sync="uploadImgVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            :append-to-body="true"
            @close="closeUpLoadImg"
            width="640px">
            <div v-loading="isUpload">
                <el-upload
                    ref="uploadImage"
                    action="/api/file/uploadImage"
                    :on-change="fileChange"
                    accept=".jpg, .jpeg, .png"
                    :show-file-list="false"
                    list-type="picture"
                    name="file"
                    :limit="limit"
                    :multiple="limit > 1"
                    :file-list="fileList"
                    :on-exceed="overRange"
                    :auto-upload="false">
                    <div class="el-upload el-upload--picture-card upload_btn" :style="imgStyle" slot="trigger"
                         size="small" type="primary">
                        <i class="el-icon-plus"></i>
                    </div>
                    <template v-for="(item, index) in fileList">
                        <div class="list_item" :style="imgStyle" :key="index">
                            <div class="list_content">
                                <img :style="imgStyle" :src="item.url">
                                <div class="preview_box">
                                    <el-button type="text" icon="el-icon-view" class="preview_img_icon"></el-button>
                                    <img class="preview_img" :style="imgStyle" :src="item.url" preview="uploadImage">
                                </div>
                            </div>
                            <el-button type="danger" icon="el-icon-circle-close" class="remove_img" circle
                                       @click="deleteImage(item)"></el-button>
                        </div>
                    </template>
                </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeUpLoadImg">取 消</el-button>
                <el-button type="primary" @click="submitUpload">上 传</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import md5 from 'js-md5'
import {getUuid} from '@/utils/tool'
import {getUploadToken, uploadImg} from '@/api/common'

export default {
    name: 'UploadImage',
    computed: {
        imgStyle: function () {
            let width = this.imgWidth
            width = width < 50 ? 50 : width > 240 ? 240 : width
            let height = this.imgHeight
            height = height < 50 ? 50 : height > 240 ? 240 : height
            return {
                width: width + 'px',
                height: height + 'px'
            }
        },
        limit: function () {
            let limit = this.limitNum
            limit = (limit > 9 || limit < 1) ? 9 : limit
            return limit
        }
    },
    props: {
        uploadImgVisible: {
            type: Boolean,
            default: false
        },
        imgList: {
            type: Array,
            default: function () {
                return []
            }
        },
        imgWidth: {
            type: Number,
            default: 100
        },
        imgHeight: {
            type: Number,
            default: 100
        },
        thumbnail: {
            type: String,
            default: ''
        },
        limitNum: {
            type: Number,
            default: 9
        }
    },
    data () {
        return {
            isUpload: false,
            fileList: []
        }
    },
    methods: {
        submitUpload: function () {
            if (this.isUpload) {
                return false
            }

            this.isUpload = true

            this.initImageData().then(({fileObj, keysStr}) => {
                return getUploadToken({keys: keysStr, thumbnail: this.thumbnail}).then(res => {
                    let files = res.data

                    let uploadArr = []

                    files.map(file => {
                        let formData = fileObj[file.key]
                        formData.append('token', file.token)
                        uploadArr.push(uploadImg.bind(this, formData))
                        delete file.token
                    })

                    return this.mergePromise(uploadArr).then(data => {
                        this.$emit('update:imgList', files)
                        this.$emit('update:uploadImgVisible', false)
                        this.$emit('upload-success', {files, data})
                    })
                })
            }).catch(err => {
                this.$emit('upload-fail', err)
                this.$message.error('上传失败')
            }).finally(() => {
                this.isUpload = false
            })
        },
        isAssetTypeAnImage (ext) {
            return [
                'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1
        },
        fileChange (file, fileList) {
            // 获取最后一个.的位置
            let index = file.name.lastIndexOf('.')
            // 获取后缀
            let ext = file.name.substr(index + 1)
            // 判断文件类型是否符合
            if (!this.isAssetTypeAnImage(ext)) {
                this.$message.error('只能上传jpg/jpeg/png文件!')
                // 必须手动移除，不然已选择的文件还存在list中
                this.$refs['uploadImage'].uploadFiles = this.removeImage(file, fileList)
                return false
            }

            // 判断文件大小是否符合
            if (!(file.size / 1024 / 1024 <= 5)) {
                this.$message.error('上传文件大小不能超过5MB!')
                // 必须手动移除，不然已选择的文件还存在list中
                this.$refs['uploadImage'].uploadFiles = this.removeImage(file, fileList)
                return false
            }
            this.fileList = fileList
        },
        overRange () {
            this.$message.warning(`一次最多上传 ${this.limit} 张图片`)
        },
        removeImage (file, fileList) {
            return fileList.filter(item => {
                return item.uid !== file.uid
            })
        },
        deleteImage (file) {
            this.fileList = this.removeImage(file, this.fileList)
        },
        closeUpLoadImg () {
            this.fileList = []
            // 清除选择列表
            this.$refs['uploadImage'].clearFiles()
            this.$emit('update:uploadImgVisible', false)
            this.$emit('upload-close')
        },
        initImageData () {
            return new Promise((resolve) => {
                let fileObj = {}
                let keys = []
                this.fileList.map(file => {
                    //  用FormData存放上传文件
                    let formData = new FormData()
                    let key = md5(getUuid())
                    formData.append('file', file.raw, key)
                    formData.append('key', key)
                    keys.push(key)
                    fileObj[key] = formData
                })
                let keysStr = keys.join(',')
                resolve({fileObj, keysStr})
            })
        },
        mergePromise (ajaxArray) {
            let p = Promise.resolve()

            let arr = []

            ajaxArray.map(promise => {
                p = p.then(promise).then(data => {
                    arr.push(data)
                    return arr
                })
            })

            return p
        }
    }
}
</script>

<style scoped lang="scss">
.upload_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 5px 0;
}

.list_item {
    position: relative;
    display: inline-block;
    margin: 0 5px 5px 0;
    vertical-align: bottom;
    cursor: pointer;

    .list_content {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        overflow: hidden;
    }

    .preview_box {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        background-color: rgba(0, 0, 0, 0.4);
        transition: .2s;

        .preview_img_icon {
            padding: 0;
            color: #fff;
        }

        .preview_img {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
        }
    }

    .remove_img {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        transform: translateX(30%) translateY(-30%);
    }
}

.list_item:hover {
    .preview_box {
        opacity: 1;
    }

    .remove_img {
        display: block;
    }
}
</style>
