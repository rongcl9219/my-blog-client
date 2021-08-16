<template>
    <div class="login-container">
        <div class="login-card">
            <h3 class="title">后台登录</h3>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
                <el-form-item prop="username">
                    <span class="login-icon">
                        <i class="el-icon-third-yonghu"></i>
                    </span>
                    <el-input
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="用户名"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item prop="password">
                    <span class="login-icon">
                        <i class="el-icon-third-lock"></i>
                    </span>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType ? 'password' : 'text'"
                        placeholder="密码"
                        name="password"
                        tabindex="2"
                        auto-complete="off"
                    />
                    <span class="show-pwd" @click="passwordType = !passwordType">
                        <i :class="passwordType ? 'el-icon-third-yanjing_bi' : 'el-icon-third-yanjing'"></i>
                    </span>
                </el-form-item>
                <el-form-item prop="validCode">
                    <div style="display: flex; align-items: center;">
                        <span class="login-icon" style="margin-right: 5px;">
                            <i class="el-icon-third-yanzhengma"></i>
                        </span>
                        <el-input v-model="loginForm.validCode" autocomplete="off" placeholder="验证码，不区分大小写"></el-input>
                        <ValidCode v-model="ValidCodeModel.validCode"
                                   :refresh="ValidCodeModel.codeRefresh"></ValidCode>
                    </div>
                </el-form-item>
                <el-button :loading="loading" type="primary" @click="handleLogin('loginForm')"
                           style="width:100%;margin-bottom:30px;">
                    登录
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import ValidCode from '@/components/ValidCode'

export default {
    name: 'AdminLogin',
    components: {
        ValidCode
    },
    data () {
        let validCode = (rule, value, callback) => {
            if (value.trim() === '') {
                callback(new Error('请输入验证码'))
            } else if (value.toLocaleUpperCase() !== this.ValidCodeModel.validCode.toLocaleUpperCase()) {
                ++this.ValidCodeModel.codeRefresh
                callback(new Error('验证码错误'))
            } else {
                callback()
            }
        }
        return {
            msg: '登录',
            loginForm: {
                username: '',
                password: '',
                validCode: ''
            },
            loginRules: {
                username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                validCode: [{validator: validCode, required: true, trigger: 'blur'}]
            },
            ValidCodeModel: {
                validCode: '',
                codeRefresh: 0
            },
            loading: false,
            passwordType: true
        }
    },
    methods: {
        ...mapActions('user', [
            'login',
            'loginOut'
        ]),
        handleLogin (formName) {
            let _this = this
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        username: _this.loginForm.username,
                        password: _this.loginForm.password
                    }
                    _this.login(data).then(res => {
                        if (res.code === 200) {
                            _this.$router.push('/admin')
                        } else {
                            _this.$message.error(res.msg)
                        }
                    }).catch(() => {
                    })
                } else {
                    return false
                }
            })
        }
    },
    created () {
        this.loginOut()
    }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #222;
$cursor: #222;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }

            &::-webkit-input-placeholder {
                color: gray;
            }

            &::-moz-placeholder {
                color: gray;
            }

            &::-moz-placeholder {
                color: gray;
            }

            &::-ms-input-placeholder {
                color: gray;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style scoped lang="scss">
.login-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    user-select: none;

    &:after {
        z-index: -1;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('/static/imgs/default_img/login_bg.jpg');
        background-origin: revert;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .login-card {
        position: relative;
        width: 600px;
        height: 500px;
        padding: 0 20px;
        box-sizing: border-box;
        box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.25);

        .title {
            margin: 20px 0;
            font-size: 26px;
            letter-spacing: 10px;
            text-align: center;
            font-family: 华文楷体;
            font-weight: bold;
        }

        .login-icon {
            margin-left: 20px;
            font-size: 16px;
        }

        .show-pwd {
            font-size: 16px;
            cursor: pointer;
        }
    }
}
</style>
