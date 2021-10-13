<template>
    <div id="aboutMe" v-loading="aboutMeLoading" :element-loading-text="loadingText">
        <el-card class="box-card">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="网站名称">
                    <el-input v-model="form.webUser"></el-input>
                </el-form-item>
                <el-form-item label="座右铭">
                    <el-input v-model="form.motto"></el-input>
                </el-form-item>
                <el-form-item label="github地址">
                    <el-input v-model="form.githubLink"></el-input>
                </el-form-item>
                <el-form-item label="个人头像">
                    <template v-if="form.avatar.url">
                        <div class="avatar_item">
                            <img :src="form.avatar.url" preview="aboutMeAvatar" alt="" />
                        </div>
                    </template>
                    <el-button class="upload_avatar_btn" type="primary" icon="el-icon-plus" @click="upLoadImgVisible = true"></el-button>
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input type="textarea" v-model="form.personalDesc"></el-input>
                </el-form-item>
                <el-form-item label="网站简介">
                    <el-input type="textarea" v-model="form.webDesc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <upload-avatar thumbnail="avatar" @crop-upload-success="uploadAvatarSuccess"
                       :uploadAvatarVisible.sync="upLoadImgVisible"></upload-avatar>
    </div>
</template>

<script>
import {getWebInfo, saveWebInfo} from '@/api/webInfo'
import UploadAvatar from '@/components/UploadAvatar'

export default {
    name: 'AdminAbout',
    components: {
        'upload-avatar': UploadAvatar
    },
    data () {
        return {
            upLoadImgVisible: false,
            form: {
                webUser: '',
                githubLink: '',
                avatar: {
                    url: '',
                    key: ''
                },
                motto: '',
                personalDesc: '',
                webDesc: ''
            },
            aboutMeLoading: true,
            loadingText: '加载中...'
        }
    },
    methods: {
        onSubmit () {
            this.loadingText = '保存中...'
            this.aboutMeLoading = true

            let paramObj = {
                WEB_USER: this.form.webUser,
                GITHUB_LINK: this.form.githubLink,
                WEB_AVATAR: this.form.avatar.key,
                PERSONAL_DESC: this.form.personalDesc,
                WEB_DESC: this.form.webDesc,
                MOTTO: this.form.motto
            }

            saveWebInfo(paramObj).then(() => {
                this.$message.success('修改成功')
            }).catch(() => {
                this.$message.error('修改失败')
            }).finally(() => {
                this.aboutMeLoading = false
            })
        },
        uploadAvatarSuccess (file) {
            this.form.avatar.key = file.key
            this.form.avatar.url = file.url
        }
    },
    created () {
        this.aboutMeLoading = true
        getWebInfo().then(res => {
            let paramData = res.data.paramData
            this.form.webUser = paramData.WEB_USER|| ''
            this.form.githubLink = paramData.GITHUB_LINK || ''
            this.form.personalDesc = paramData.PERSONAL_DESC || ''
            this.form.webDesc = paramData.WEB_DESC || ''
            this.form.motto = paramData.MOTTO || ''
            if (paramData.WEB_AVATAR) {
                this.form.avatar = paramData.WEB_AVATAR
            }
        }).catch(() => {
        }).finally(() => {
            this.aboutMeLoading = false
        })
    }
}
</script>

<style scoped lang="scss">
.avatar_item{
    float: left;
    width: 60px;
    height: 60px;
    margin-right: 20px;
    border-radius: 6px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
}
.upload_avatar_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    color: #000;
    font-size: 20px;
}
</style>
