<template>
    <div class="comment_module">
        <div class="comment_form">
            <el-input class="comment_username"
                      v-model="commentUser"
                      size="mini"
                      clearable
                      placeholder="昵称（必填）"
                      show-word-limit
                      maxlength="10">
            </el-input>
            <div class="comment_content">
                <el-input type="textarea"
                          :rows="3"
                          size="mini"
                          resize="none"
                          maxlength="150"
                          show-word-limit
                          placeholder="写下你的评论"
                          v-model="commentContent">
                </el-input>
                <Emoji-Box :handleSvgItem="clickSvg"></Emoji-Box>
            </div>
            <el-row type="flex" justify="end">
                <el-button type="primary" size="mini" @click="checkComment(1)">发送</el-button>
            </el-row>
        </div>
        <div class="comment_container">
            <ul class="comment_list">
                <li class="comment_list_item" v-for="item in commentList" :key="item.commentId">
                    <div class="item_box">
                        <el-avatar shape="square" :src="defaultUser"></el-avatar>
                        <div class="right_box">
                            <div class="reply_con">
                                <span class="user_t" v-text="item.userName"></span><span class="colon">：</span>
                                <Comment-Content :html="item.content"></Comment-Content>
                            </div>
                            <div class="comment_func">
                                <span class="reply_time" v-text="formatDate('', item.createDate, 2)"></span>
                                <a class="reply_btn" @click="reply(item, 1)"><i class="el-icon-chat-dot-square"></i> 回复</a>
                            </div>
                            <div class="reply_editor" :id="'p'+item.commentId">
                                <transition name="component-fade"
                                            v-on:before-enter="beforeEnter('p'+item.commentId)"
                                            v-on:after-enter="afterEnter('p'+item.commentId)"
                                            mode="out-in">
                                    <div v-if="currentReply === item.commentId">
                                        <div class="comment_content">
                                            <el-input type="textarea"
                                                      :rows="3"
                                                      size="mini"
                                                      resize="none"
                                                      maxlength="150"
                                                      show-word-limit
                                                      :placeholder="replyPlaceholder"
                                                      v-model="replyContent">
                                            </el-input>
                                            <Emoji-Box :handleSvgItem="clickSvg"></Emoji-Box>
                                        </div>
                                        <el-row type="flex" justify="end">
                                            <el-button type="text" size="mini" class="cancel_btn"
                                                       @click="currentReply = ''">取消
                                            </el-button>
                                            <el-button type="text" size="mini" class="send_btn"
                                                       @click="checkComment(2)">
                                                发送
                                            </el-button>
                                        </el-row>
                                    </div>
                                </transition>
                            </div>
                            <template v-if="item.children && item.children.length > 0">
                                <ul class="reply_list">
                                    <li class="comment_list_item" v-for="child in item.children" :key="child.commentId">
                                        <div class="item_box">
                                            <el-avatar shape="square" :src="defaultUser"></el-avatar>
                                            <div class="right_box">
                                                <div class="reply_con">
                                                    <span class="user_t" v-text="child.userName"></span>
                                                    <template v-if="child.replyCommentUserName">
                                                        <span class="colon">：回复</span>
                                                        <span
                                                            class="user_t">@<span>{{
                                                                child.replyCommentUserName
                                                            }}</span></span>
                                                        <span class="colon">：</span>
                                                    </template>
                                                    <template v-else>
                                                        <span class="colon">：</span>
                                                    </template>
                                                    <Comment-Content :html="child.content"></Comment-Content>
                                                </div>
                                                <div class="comment_func">
                                                    <span class="reply_time"
                                                          v-text="formatDate('', child.createDate, 2)"></span>
                                                    <a class="reply_btn" @click="reply(child, 2)"><i
                                                        class="el-icon-chat-dot-square"></i> 回复</a>
                                                </div>
                                                <div class="reply_editor" :id="'r'+child.commentId">
                                                    <transition name="component-fade"
                                                                v-on:before-enter="beforeEnter('r'+child.commentId)"
                                                                v-on:after-enter="afterEnter('r'+child.commentId)"
                                                                mode="out-in">
                                                        <div v-if="currentReply === child.commentId">
                                                            <div class="comment_content">
                                                                <el-input type="textarea"
                                                                          :rows="3"
                                                                          size="mini"
                                                                          resize="none"
                                                                          maxlength="150"
                                                                          show-word-limit
                                                                          :placeholder="replyPlaceholder"
                                                                          v-model="replyContent">
                                                                </el-input>
                                                                <Emoji-Box :handleSvgItem="clickSvg"></Emoji-Box>
                                                            </div>
                                                            <el-row type="flex" justify="end">
                                                                <el-button type="text" size="mini" class="cancel_btn"
                                                                           @click="currentReply = ''">取消
                                                                </el-button>
                                                                <el-button type="text" size="mini" class="send_btn"
                                                                           @click="checkComment(2)">发送
                                                                </el-button>
                                                            </el-row>
                                                        </div>
                                                    </transition>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </template>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <Vcode :show="isVcodeShow" @success="sendComment" @close="isVcodeShow = false"></Vcode>
    </div>
</template>

<script>
import defaultUser from '@/assets/images/other/banner.jpg'
import {mapActions, mapGetters} from 'vuex'
import {getComment, addComment} from '@/api/common'
import {formatDate} from '@/utils/tool'
import Emoji from '@/components/Emoji'
import CommentContent from './CommentContent'
import Vcode from 'vue-puzzle-vcode'
import Mint from 'mint-filter'
import words from '@/utils/minGanCi'

const mint = new Mint(words)
export default {
    name: "CommentBox",
    components: {
        'Emoji-Box': Emoji,
        'Vcode': Vcode,
        'Comment-Content': CommentContent
    },
    computed: {
        ...mapGetters('common', [
            'getCommentUser'
        ]),
        commentUser: {
            get() {
                return this.getCommentUser
            },
            set(newVal) {
                this.setCommentUser(newVal)
            }
        }
    },
    props: {
        articleId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            commentList: [],
            isVcodeShow: false,
            commentContent: '',
            currentReply: '',
            replyContent: '',
            replyPlaceholder: '',
            replyModule: {
                content: '',
                commentLevel: 1,
                parentCommentId: '',
                parentCommentUserName: '',
                replyCommentId: '',
                replyCommentUserName: ''
            },
            defaultUser: defaultUser
        }
    },
    watch: {
        currentReply() {
            this.replyContent = ''
        }
    },
    methods: {
        ...mapActions('common', [
            'setCommentUser'
        ]),
        formatDate,
        clickSvg(key) {
            if (this.currentReply) {
                this.replyContent += key
            } else {
                this.commentContent += key
            }
        },
        checkComment(type) {
            if (!this.commentUser) {
                this.$message.warning('请输入昵称')
                return false
            }

            this.replyModule.content = type === 1 ? this.commentContent : this.replyContent

            if (!this.replyModule.content) {
                this.$message.warning('评论内容不能为空')
                return false
            }
            this.replyModule.commentLevel = type

            mint.filter(this.replyModule.content, {replace: false})
                .then(data => {
                    if (!data.pass) {
                        this.$notify({
                            title: '评论包含敏感词汇',
                            dangerouslyUseHTMLString: true,
                            message: `<strong style="color: red;">${data.words.join(',')}</strong>`,
                            type: 'warning',
                            position: 'top-left',
                            offset: 100,
                            duration: 3000
                        })
                    } else {
                        this.isVcodeShow = true
                    }
                })
        },
        getComment() {
            getComment(this.articleId).then(res => {
                this.commentList = res.data.commentList
            }).catch(() => {

            })
        },
        sendComment() {
            let data = {
                userName: this.commentUser,
                articleId: this.articleId,
                ...this.replyModule
            }

            if (this.replyModule.commentLevel === 1) {
                data.replyCommentId = ''
                data.replyCommentUserName = ''
                data.parentCommentId = ''
                data.parentCommentUserName = ''
            }
            addComment(data).then(() => {
                this.$message.success('评论成功')
                this.replyModule.content = ''
                if (this.replyModule.commentLevel === 1) {
                    this.commentContent = ''
                } else {
                    this.currentReply = ''
                    this.replyPlaceholder = ''
                    this.replyContent = ''
                    this.replyModule.replyCommentId = ''
                    this.replyModule.replyCommentUserName = ''
                    this.replyModule.parentCommentId = ''
                    this.replyModule.parentCommentUserName = ''
                }
                this.getComment()
            }).catch(() => {
                this.$message.error('评论失败')
            }).finally(() => {
                this.isVcodeShow = false
            })
        },
        reply(data, type) {
            if (type === 1) {
                this.replyModule.replyCommentId = ''
                this.replyModule.replyCommentUserName = ''
                this.replyModule.parentCommentId = data.commentId
                this.replyModule.parentCommentUserName = data.userName
            } else {
                this.replyModule.replyCommentId = data.commentId
                this.replyModule.replyCommentUserName = data.userName
                this.replyModule.parentCommentId = data.parentCommentId
                this.replyModule.parentCommentUserName = data.parentCommentUserName
            }

            this.replyPlaceholder = `@${data.userName}`
            this.currentReply = data.commentId
        },
        beforeEnter(el) {
            let ele = document.getElementById(el)

            ele.style.overflow = 'hidden'
        },
        afterEnter(el) {
            let ele = document.getElementById(el)

            ele.style.overflow = 'visible'
        }
    },
    created() {
        this.getComment()
    }
}
</script>

<style lang="scss">
.comment_module {
    .el-input__inner, .el-textarea__inner {
        color: $Ba2_u;
        &:focus {
            @include border_color('theme-color');
        }
    }
}
</style>

<style scoped lang="scss">
.comment_module {
    padding: 20px;
    background-color: #fafafb;
    border-radius: 4px;
    @include background_color('background-color2');
}

.comment_form {
    padding: 5px;

    .comment_username, .comment_content {
        position: relative;
        margin-bottom: 10px;
    }
}

.comment_list_item {
    margin-bottom: 10px;
    padding: 5px 0;

    .item_box {
        .el-avatar {
            float: left;
        }

        .right_box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 50px;
            line-height: 1.5;

            .reply_con {
                font-size: 0;

                .user_t {
                    font-size: 12px;
                    @include font_color('theme-color');
                }

                .colon {
                    margin-right: 5px;
                    font-size: 12px;
                    @include font_color('text-color3');
                }

                .comment_con {
                    font-size: 12px;

                    > > > .svg-icon {
                        font-size: 20px;
                    }
                }
            }

            .comment_func {
                display: flex;
                justify-content: space-between;
                margin-top: 5px;
                font-size: 12px;
                @include font_color('text-color4');

                .reply_btn {
                    margin-right: 10px;
                    cursor: pointer;

                    &:hover {
                        color: $Or5_u;
                    }
                }
            }

            .reply_list {
                margin: 10px 0;
                padding: 10px 0 10px 20px;
                border-radius: 4px;
                @include background_color('background-color4');
            }
        }
    }
}

.comment_list > .comment_list_item {
    border-bottom: 1px solid;
    @include border_color('border-color2');
}

.el-button--primary {
    @include background_color('theme-color');
}

.reply_editor {
    position: relative;
    margin-top: 10px;

    .comment_content {
        position: relative;
    }

    .cancel_btn {
        color: $Ye5_u;

        &:hover {
            color: $Ye4_u;
        }
    }

    .send_btn {
        margin-right: 10px;
        @include font_color('theme-color');
    }
}

.component-fade-enter-active {
    transform: translateX(0);
    transition: .3s ease;
}

.component-fade-enter, .component-fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>
