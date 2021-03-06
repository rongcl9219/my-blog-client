<template>
    <div class="navbar">
        <hamburger :is-active="getSidebarOpen" class="hamburger-container" @toggleClick="toggleSideBar"/>

        <breadcrumb class="breadcrumb-container"/>

        <div class="right-menu">
            <el-link href="/" class="link-home" :underline="false" target="_blank"><i class="el-icon-s-home"></i>首页</el-link>
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <el-avatar style="float: left; cursor: pointer;" shape="square" :size="40">
                        <img :src="userAvatar"/>
                    </el-avatar>
                    <i class="el-icon-caret-bottom"/>
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <el-dropdown-item @click.native="openUserInfoDialog">个人信息</el-dropdown-item>
                    <el-dropdown-item @click.native="updatePasswordDialog.visible = true">修改密码</el-dropdown-item>
                    <el-dropdown-item divided @click.native="logout">
                        <span style="display:block;">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <el-dialog title="修改密码"
                   @close="closeUpdatePasswordDialog('updatePasswordForm')"
                   :visible.sync="updatePasswordDialog.visible"
                   :modal-append-to-body="false"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false">
            <el-form ref="updatePasswordForm" :model="updatePasswordDialog.updatePasswordForm" status-icon
                     :rules="updatePasswordDialog.rules">
                <el-form-item label="输入旧密码" prop="oldPass">
                    <el-input v-model="updatePasswordDialog.updatePasswordForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="输入新密码" prop="newPass">
                    <el-input placeholder="密码必须包含且只能由数字和字母组成，长度8~16"
                              v-model="updatePasswordDialog.updatePasswordForm.newPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="再次输入新密码" prop="checkPass">
                    <el-input v-model="updatePasswordDialog.updatePasswordForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updatePasswordDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="updatePassword('updatePasswordForm')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="个人信息"
                   @close="closeUserInfoDialog('updateUserInfoForm')"
                   :visible.sync="userInfoDialog.visible"
                   :close-on-press-escape="false"
                   :append-to-body="true"
                   :close-on-click-modal="false">
            <el-form ref="updateUserInfoForm"
                     :model="userInfoDialog.userInfoForm"
                     status-icon label-width="80px">
                <el-form-item label="头像">
                    <el-avatar style="float: left; margin-right: 10px;" shape="square" :size="50">
                        <img :src="userInfoDialog.userInfoForm.avatarUrl"/>
                    </el-avatar>
                    <el-button type="primary" @click="uploadAvatarVisible = true">上传头像</el-button>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="userInfoDialog.userInfoForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="个性签名">
                    <el-input type="textarea"
                              :autosize="{ minRows: 2, maxRows: 5}"
                              v-model="userInfoDialog.userInfoForm.signature" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userInfoDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="updateUserInfo('updateUserInfoForm')">确 定</el-button>
            </div>
        </el-dialog>

        <upload-avatar thumbnail="avatar" @crop-upload-success="uploadAvatarSuccess"
                       :uploadAvatarVisible.sync="uploadAvatarVisible"></upload-avatar>
    </div>
</template>

<script>
import defaultUserImg from '@/assets/images/default_img/default_user.png'
import {mapActions, mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import UploadAvatar from '@/components/UploadAvatar'
import {updatePassword, getUserInfo, updateUserInfo} from '@/api/user'

export default {
    name: 'NavBar',
    components: {
        Breadcrumb,
        Hamburger,
        'upload-avatar': UploadAvatar
    },
    computed: {
        ...mapGetters('setting', [
            'getSidebarOpen'
        ]),
        ...mapGetters('user', [
            'getAvatar'
        ]),
        userAvatar () {
            return this.getAvatar || defaultUserImg
        }
    },
    data () {
        let validatePassword = (rule, value, callback) => {
            if (value.trim() === '') {
                callback(new Error('请输入新密码'))
            } else if (!/^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$/.test(value)) {
                callback(new Error('密码必须包含且只能由数字和字母组成，长度8~16'))
            } else if (value !== this.updatePasswordDialog.updatePasswordForm.checkPass) {
                this.updatePasswordDialog.updatePasswordForm.checkPass = ''
                callback(new Error('两次密码输入不一致'))
            } else {
                callback()
            }
        }
        let checkPassword = (rule, value, callback) => {
            if (value.trim() === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.updatePasswordDialog.updatePasswordForm.newPass) {
                this.updatePasswordDialog.updatePasswordForm.checkPass = ''
                callback(new Error('两次密码输入不一致'))
            } else {
                this.$refs.updatePasswordForm.validateField('newPass')
                callback()
            }
        }
        return {
            updatePasswordDialog: {
                visible: false,
                updatePasswordForm: {
                    oldPass: '',
                    newPass: '',
                    checkPass: ''
                },
                rules: {
                    oldPass: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'}
                    ],
                    newPass: [
                        {validator: validatePassword, required: true, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: checkPassword, required: true, trigger: 'blur'}
                    ]
                }
            },
            userInfoDialog: {
                visible: false,
                userInfoForm: {
                    avatar: '',
                    signature: '',
                    email: '',
                    avatarUrl: ''
                }
            },
            uploadAvatarVisible: false
        }
    },
    methods: {
        ...mapActions('setting', [
            'toggleSideBar'
        ]),
        ...mapActions('user', [
            'loginOut',
            'setUserAvatar'
        ]),
        logout () {
            this.$router.push({
                path: '/login',
                replace: true
            })
        },
        closeUpdatePasswordDialog (formName) {
            this.$refs[formName].resetFields()
        },
        updatePassword (formName) {
            let _this = this
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        oldPass: _this.updatePasswordDialog.updatePasswordForm.oldPass,
                        newPass: _this.updatePasswordDialog.updatePasswordForm.newPass,
                        checkPass: _this.updatePasswordDialog.updatePasswordForm.checkPass
                    }
                    updatePassword(data).then(() => {
                        _this.$message.success('修改成功')
                        _this.$router.replace('/login')
                    }).catch(() => {
                        _this.$message.error('修改失败')
                    })
                } else {
                    return false
                }
            })
        },
        openUserInfoDialog () {
            this.userInfoDialog.visible = true
            getUserInfo().then(res => {
                this.userInfoDialog.userInfoForm = res.data.userInfo
            }).catch(err => {
                this.$message.error(err.msg || err.message)
            })
        },
        updateUserInfo () {
            const updateLoading = this.$loading({
                lock: true,
                text: '保存中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })

            let data = {
                avatar: this.userInfoDialog.userInfoForm.avatar,
                signature: this.userInfoDialog.userInfoForm.signature,
                email: this.userInfoDialog.userInfoForm.email,
                userId: this.userInfoDialog.userInfoForm.userId
            }

            updateUserInfo(data).then(() => {
                this.$message.success('修改成功')
                this.setUserAvatar(this.userInfoDialog.userInfoForm.avatarUrl)
                this.userInfoDialog.visible = false
            }).catch(() => {
                this.$message.error('修改失败')
            }).finally(() => {
                updateLoading.close()
            })
        },
        closeUserInfoDialog (formName) {
            this.$refs[formName].resetFields()
        },
        uploadAvatarSuccess (fileObj) {
            this.userInfoDialog.userInfoForm.avatar = fileObj.key
            this.userInfoDialog.userInfoForm.avatarUrl = fileObj.url
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        display: flex;
        height: 100%;
        line-height: 50px;

        .link-home {
            margin-right: 20px;
            transition: .3s;
        }

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background .3s;

                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
