<template>
    <div id="articleManage" v-loading="articleListLoading">
        <div class="search_box">
            <label>文章状态：</label>
            <el-select v-model="articleStatus" size="small" placeholder="请选择" @change="getArticleList(1)">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <template v-if="articleList.length === 0 && (articleStatus === 3 || articleStatus === 1)">
            <NoData/>
        </template>
        <template v-else>
            <el-row :gutter="24">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" style="margin-bottom: 20px"
                        v-show="articleStatus === 0 || articleStatus === 2">
                    <div class="card_item">
                        <el-card class="box-card new_card">
                            <div class="card_back"></div>
                            <div class="card_content" @click="openArticleDialog(false)">
                                <el-button type="text" icon="el-icon-circle-plus-outline"
                                           class="new_article_btn"></el-button>
                            </div>
                        </el-card>
                    </div>
                </el-col>
                <template v-for="article in articleList">
                    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" :key="article.articleId"
                            style="margin-bottom: 20px">
                        <el-link :href="'/articlePreview?articleId='+article.articleId"
                                 target="_blank"
                                 style="display: block;"
                                 :underline="false">
                            <div class="card_item">
                                <el-card class="box-card">
                                    <div class="card_back"
                                         :style="{backgroundImage: `url(${article.articleCover})`}"></div>
                                    <div class="card_mask"></div>
                                    <div class="card_content">
                                        <h3 class="con_title">
                                            <i class="el-icon-s-promotion"
                                               @click.stop.prevent="updatePublish(article.articleId, article.isPublish)"
                                               :title="article.isPublish === 0 ? '未发布' : '已发布'"
                                               :style="{color: article.isPublish === 0 ? '#E6A23C' : '#67C23A'}"></i>
                                            {{ article.articleTitle }}
                                        </h3>
                                        <h5 class="con_subtitle">{{ article.articleSubtitle }}</h5>
                                        <p class="con_info">简介：{{ article.articleInfo }}</p>
                                        <p class="con_keyword">关键词：{{ article.articleKeyword }}</p>
                                        <p class="con_type">
                                            <span>分类：</span>
                                            <el-tag
                                                v-for="item in article.classTypeList"
                                                class="con_tag"
                                                :key="item.classId"
                                                type="info"
                                                effect="dark">
                                                {{ item.className }}
                                            </el-tag>
                                        </p>
                                        <p class="con_type">
                                            <span>标签：</span>
                                            <el-tag
                                                v-for="item in article.tagTypeList"
                                                class="con_tag"
                                                :key="item.tagId"
                                                type="info"
                                                effect="dark">
                                                {{ item.tagName }}
                                            </el-tag>
                                        </p>
                                        <p class="con_footer">
                                            <span>{{ article.createUsername }}</span>
                                            <span>{{ article.createDate }}</span>
                                        </p>
                                        <template v-if="article.isPublish === 0">
                                            <el-popover
                                                placement="bottom-end"
                                                width="50"
                                                trigger="hover">
                                                <div style="text-align: center;">
                                                    <template v-if="articleStatus === 3">
                                                        <p>
                                                            <el-button style="color: #ffa200;" type="text" size="mini"
                                                                       @click="recoverArticle(article.articleId)">恢复删除
                                                            </el-button>
                                                        </p>
                                                    </template>
                                                    <template v-else>
                                                        <p>
                                                            <el-button type="text" size="mini" icon="el-icon-edit"
                                                                       @click="openArticleDialog(true, article.articleId)">
                                                                编辑
                                                            </el-button>
                                                        </p>
                                                        <p>
                                                            <el-button type="text" size="mini"
                                                                       @click="openUpdateContent(article.articleId)">
                                                                编辑内容
                                                            </el-button>
                                                        </p>
                                                        <p>
                                                            <el-button type="text" size="mini"
                                                                       icon="el-icon-delete"
                                                                       @click="deleteArticle(article.articleId)"
                                                                       style="color: #ff0000;">删除
                                                            </el-button>
                                                        </p>
                                                    </template>
                                                </div>
                                                <el-button slot="reference" type="text" class="tip_btn"
                                                           icon="el-icon-more-outline"></el-button>
                                            </el-popover>
                                        </template>
                                    </div>
                                </el-card>
                            </div>
                        </el-link>
                    </el-col>
                </template>
            </el-row>
            <el-pagination
                style="margin: 30px auto;text-align: center;"
                background
                layout="prev, pager, next"
                @current-change="getArticleList"
                :page-size="pagination.pageSize"
                :current-page.sync="pagination.page"
                :total="pagination.total">
            </el-pagination>
        </template>

        <!--    文章弹窗    -->
        <el-dialog
            :title="articleDialog.title"
            :visible.sync="articleDialog.visible"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            @closed="closeArticleDialog"
            width="40%">
            <el-form :model="articleDialog.articleForm" status-icon :rules="articleDialog.formRules"
                     ref="articleForm" label-width="100px" v-loading="articleDialog.formLoading">
                <el-form-item label="文章标题" prop="articleTitle">
                    <el-input type="text" v-model="articleDialog.articleForm.articleTitle"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章副标题">
                    <el-input type="text" v-model="articleDialog.articleForm.articleSubtitle"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章关键词">
                    <el-input type="text" v-model="articleDialog.articleForm.articleKeyword"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章简介" prop="articleInfo">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                              v-model="articleDialog.articleForm.articleInfo"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章封面" prop="articleCover">
                    <template v-if="articleDialog.articleForm.articleCover.length > 0">
                        <div
                            style="float: left; width: 60px; height: 60px; margin-right: 20px; border-radius: 6px; overflow: hidden;">
                            <img style="width: 100%; height: 100%; cursor: pointer;"
                                 :src="articleDialog.articleForm.articleCover[0].url" preview="articleCover">
                        </div>
                    </template>
                    <el-button type="primary" size="mini" icon="el-icon-upload"
                               @click="articleDialog.uploadImgVisible = true">上传封面
                    </el-button>
                    <UploadImage :imgList.sync="articleDialog.articleForm.articleCover"
                                 :uploadImgVisible.sync="articleDialog.uploadImgVisible"
                                 thumbnail="articleCover"
                                 @upload-close="uploadDialogClose"
                                 :limitNum="1"></UploadImage>
                </el-form-item>
                <el-form-item label="所属类型" prop="classType">
                    <el-select v-model="articleDialog.articleForm.classType" style="width: 100%" multiple
                               @visible-change="classTypeChange"
                               @remove-tag="classTypeRemove" placeholder="请选择">
                        <el-option
                            v-for="item in classTypeOptions"
                            :key="item.classId"
                            :label="item.className"
                            :value="item.classId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章标签" prop="tagType">
                    <el-select v-model="articleDialog.articleForm.tagType" style="width: 100%" multiple
                               placeholder="请选择">
                        <el-option
                            v-for="item in articleDialog.tagTypeOptions"
                            :key="item.tagId"
                            :label="item.tagName"
                            :value="item.tagId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="articleDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="submitArticle('articleForm')"
                           :loading="articleDialog.btnLoading">
                    {{ articleDialog.btnLoading ? '加载中...' : '保 存' }}
                </el-button>
              </span>
        </el-dialog>

        <!--    编辑文章内容    -->
        <el-dialog
            title="编辑文章内容"
            fullscreen
            center
            custom-class="markdown-content"
            :visible.sync="editContentModel.mavonEditorVisible">
            <Markdown ref="markdown" :content="editContentModel.articleContent"></Markdown>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="editContentModel.mavonEditorVisible = false">返 回</el-button>
                <el-button type="primary" @click="saveContent">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    getArticleList,
    newArticle,
    editArticle,
    deleteArticle,
    recoverArticle,
    updatePublish,
    getArticleInfo,
    saveContent,
    getContent
} from '@/api/article'
import {getAllClass} from '@/api/class'
import {getAllTag} from '@/api/tag'

import UploadImage from '@/components/UploadImage'
import Markdown from '@/components/Markdown'

export default {
    name: 'AdminArticle',
    components: {
        UploadImage,
        Markdown
    },
    data() {
        return {
            articleStatus: 0,
            options: [{
                value: 0,
                label: '全部'
            }, {
                value: 1,
                label: '已发布'
            }, {
                value: 2,
                label: '未发布'
            }, {
                value: 3,
                label: '已删除'
            }],
            articleList: [],
            articleListLoading: false,
            allTagList: [],
            classTypeOptions: [],
            pagination: {
                page: 1,
                pageSize: 7,
                total: 0
            },
            articleDialog: {
                title: '',
                isEdit: false,
                visible: false,
                btnLoading: false,
                formLoading: false,
                uploadImgVisible: false,
                tagTypeOptions: [],
                articleForm: {
                    articleId: '',
                    articleTitle: '',
                    articleSubtitle: '',
                    articleKeyword: '',
                    articleInfo: '',
                    articleCover: [],
                    classType: [],
                    tagType: []
                },
                formRules: {
                    articleTitle: [
                        {required: true, message: '请输入文章标题', trigger: 'blur'}
                    ],
                    articleInfo: [
                        {required: true, message: '请输入文章简介', trigger: 'blur'}
                    ],
                    articleCover: [
                        {required: true, message: '请选择文章封面', trigger: 'blur'}
                    ],
                    classType: [
                        {required: true, message: '请选择所属分类', trigger: 'change'}
                    ],
                    tagType: [
                        {required: true, message: '请选择所属标签', trigger: 'change'}
                    ]
                }
            },
            editContentModel: {
                articleId: '',
                articleContent: '',
                mavonEditorVisible: false
            }
        }
    },
    methods: {
        getArticleList(page) {
            this.articleListLoading = true

            getArticleList({
                page: page,
                pageSize: this.pagination.pageSize,
                articleStatus: this.articleStatus
            }).then(res => {
                let data = res.data
                this.pagination.page = data.pagination.page
                this.pagination.total = data.pagination.total
                this.articleList = data.articleList
            }).catch(() => {
                this.$message.error('获取失败')
            }).finally(() => {
                this.articleListLoading = false
            })
        },
        classTypeChange(flag) {
            if (!flag) {
                this.articleDialog.tagTypeOptions = []
                let tagTypeOptionId = []
                this.allTagList.forEach(tag => {
                    if (this.articleDialog.articleForm.classType.indexOf(tag.classType) > -1) {
                        this.articleDialog.tagTypeOptions.push(tag)
                        tagTypeOptionId.push(tag.tagId)
                    }
                })
                if (this.articleDialog.articleForm.tagType.length > 0) {
                    this.articleDialog.articleForm.tagType = this.articleDialog.articleForm.tagType.filter(tag => {
                        return tagTypeOptionId.indexOf(tag) > -1
                    })
                }
            }
        },
        classTypeRemove(val) {
            let tagArr = this.allTagList.reduce((arr, cur) => {
                if (cur.classType === val) {
                    arr.push(cur.tagId)
                }
                return arr
            }, [])

            this.articleDialog.articleForm.tagType = this.articleDialog.articleForm.tagType.filter(tag => {
                return tagArr.indexOf(tag) === -1
            })
        },
        openArticleDialog(isEdit, articleId) {
            this.articleDialog.title = isEdit ? '编辑文章' : '新增文章'
            this.articleDialog.visible = true
            this.articleDialog.isEdit = isEdit

            if (isEdit) {
                this.articleDialog.formLoading = true
                getArticleInfo(articleId).then(res => {
                    this.articleDialog.articleForm.articleId = res.data.articleId
                    this.articleDialog.articleForm.articleTitle = res.data.articleTitle
                    this.articleDialog.articleForm.articleSubtitle = res.data.articleSubtitle
                    this.articleDialog.articleForm.articleKeyword = res.data.articleKeyword
                    this.articleDialog.articleForm.articleInfo = res.data.articleInfo
                    this.articleDialog.articleForm.articleCover.push(res.data.articleCoverInfo)
                    res.data.classTypeList.map(classType => {
                        this.articleDialog.articleForm.classType.push(classType.classId)
                    })
                    this.classTypeChange(false)
                    res.data.tagTypeList.map(tagType => {
                        this.articleDialog.articleForm.tagType.push(tagType.tagId)
                    })
                }).catch(() => {
                    this.$message.error('获取文章信息失败')
                }).finally(() => {
                    this.articleDialog.formLoading = false
                })
            }
        },
        closeArticleDialog() {
            this.articleDialog.articleForm.articleId = ''
            this.articleDialog.articleForm.articleSubtitle = ''
            this.articleDialog.articleForm.articleKeyword = ''
            this.articleDialog.articleForm.articleCover = []
            this.articleDialog.isEdit = false
            this.$refs['articleForm'].resetFields()
        },
        submitArticle() {
            if (this.articleDialog.btnLoading) {
                return false
            }
            this.articleDialog.btnLoading = true

            this.$refs['articleForm'].validate((valid) => {
                if (valid) {
                    let articleData = {
                        articleTitle: this.articleDialog.articleForm.articleTitle,
                        articleSubtitle: this.articleDialog.articleForm.articleSubtitle,
                        articleKeyword: this.articleDialog.articleForm.articleKeyword,
                        articleInfo: this.articleDialog.articleForm.articleInfo,
                        articleCover: this.articleDialog.articleForm.articleCover[0].key,
                        classType: this.articleDialog.articleForm.classType.join(','),
                        tagType: this.articleDialog.articleForm.tagType.join(',')
                    }
                    let tips = this.articleDialog.title
                    this.saveArticle(articleData).then(() => {
                        this.$message.success(`${tips}成功`)
                        let page = this.articleDialog.isEdit ? this.pagination.page : 1
                        this.getArticleList(page)
                        this.articleDialog.visible = false
                    }).catch(() => {
                        this.$message.error(`${tips}失败`)
                    }).finally(() => {
                        this.articleDialog.btnLoading = false
                    })
                } else {
                    this.articleDialog.btnLoading = false
                    return false
                }
            })
        },
        saveArticle(articleData) {
            if (this.articleDialog.isEdit) {
                articleData.articleId = this.articleDialog.articleForm.articleId
                return editArticle(articleData)
            } else {
                return newArticle(articleData)
            }
        },
        updatePublish(articleId, isPublish) {
            let tip = isPublish === 0 ? '发布' : '取消发布'
            updatePublish({articleId, isPublish}).then(() => {
                this.$message.success(tip + '成功')
                this.getArticleList(1)
            }).catch(() => {
                this.$message.error(tip + '失败')
            })
        },
        openUpdateContent(articleId) {
            this.editContentModel.articleId = articleId

            getContent(articleId).then(res => {
                this.editContentModel.articleContent = res.data.articleContent || ''
            }).catch(() => {
                this.$message.error('获取内容失败')
            })

            this.editContentModel.mavonEditorVisible = true
        },
        deleteArticle(articleId) {
            this.$confirm('确定删除该文章？', '提示', {
                type: 'warning',
                confirmButtonText: '删除',
                confirmButtonClass: 'del-btn'
            }).then(() => {
                deleteArticle(articleId).then(() => {
                    this.$message.success('删除成功')
                    this.getArticleList(1)
                }).catch(() => {
                    this.$message.error('删除失败')
                })
            }).catch(() => {

            })
        },
        recoverArticle(articleId) {
            recoverArticle(articleId).then(() => {
                this.$message.success('恢复成功')
                this.getArticleList(1)
            }).catch(() => {
                this.$message.error('删除失败')
            })
        },
        uploadDialogClose() {
            this.$previewRefresh()
        },
        saveContent() {
            this.editContentModel.articleContent = this.$refs['markdown'].getContent()

            saveContent({
                articleId: this.editContentModel.articleId,
                articledContent: this.editContentModel.articleContent
            }).then(() => {
                this.$message.success('保存成功')
            }).catch(() => {
                this.$message.error('保存失败')
            })
        }
    },
    created() {
        // 获取所有分类
        getAllClass().then(res => {
            this.classTypeOptions = res.data
        }).catch(() => {
        })
        // 获取所有标签
        getAllTag().then(res => {
            this.allTagList = res.data
        }).catch(() => {
        })
        this.getArticleList(1)
    }
}
</script>

<style lang="scss">
.del-btn {
    background-color: #f00 !important;
    border-color: #f00 !important;
}

.markdown-content {
    .el-dialog__body {
        height: calc(100vh - 180px);

        #editor {
            height: 100%;
        }
    }
}
</style>

<style scoped lang="scss">
#articleManage {
    padding: 20px;
}

.box-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, .3);
    border: none;
    transition: .3s;

    &:hover {
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, .6);
    }

    .card_back {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        transition: .3s;
    }

    .card_mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .card_content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        z-index: 2;

        .tip_btn {
            position: absolute;
            top: 5px;
            right: 10px;
            padding: 0;
            color: rgba(255, 255, 255, 0.6);
            font-size: 24px;
        }

        .con_title {
            width: 85%;
            font-family: '黑体';
            font-size: 22px;
            font-weight: 600;
            color: rgba(255, 255, 255, .8);
            text-shadow: 3px 4px 2px rgba(0, 0, 0, .6);
            letter-spacing: 1px;
        }

        .con_subtitle {
            line-height: 22px;
            color: rgba(255, 255, 255, .8);
            font-weight: 600;
            font-family: fangsong;
            font-size: 17px;
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 1);
        }

        .con_info {
            max-height: 80px;
            line-height: 20px;
            padding: 2px;
            font-size: 14px;
            font-family: '新宋体';
            text-shadow: 1px 1px 1px rgba(0, 0, 0, .4);
            color: rgba(255, 255, 255, .8);
            text-overflow: ellipsis;
            word-break: break-all;
            overflow: hidden;
        }

        .con_keyword {
            color: rgba(255, 255, 255, .8);
            font-size: 14px;
            font-family: cursive;
            font-weight: 500;
            line-height: 20px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, .7);
        }

        .con_type {
            padding: 3px 0;
            line-height: 24px;
            color: rgba(255, 255, 255, .9);
            font-size: 14px;
            font-family: 'fangsong';
            text-shadow: 1px 1px 2px rgba(0, 0, 0, .7);
        }

        .con_footer {
            position: absolute;
            bottom: 10px;
            left: 10px;
            right: 10px;
            display: flex;
            justify-content: space-between;
            color: rgba(255, 255, 255, .7);
        }

        .con_tag {
            height: 22px;
            line-height: 22px;
            margin: 0 3px;
            padding: 0 7px;
            font-size: 12px;
            letter-spacing: 2px;
            font-family: 'PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Verdana,Roboto,Noto,Helvetica Neue,sans-serif';
            background-color: rgba(0, 0, 0, .55);
            border: none;
        }
    }
}

.box-card:hover {
    .card_back {
        background-size: 115% 115%;
    }
}

.card_item {
    position: relative;

    &:after {
        display: block;
        content: '';
        padding-top: 70%;
    }
}

.new_card {
    .card_back {
        background-image: url("~@/assets/images/default_img/default_article_cover/2.jpg");
    }

    .card_content {
        display: flex;
        justify-content: center;
        align-items: center;

        .new_article_btn {
            width: 120px;
            height: 120px;
            color: rgba(255, 255, 255, .7);
            font-size: 90px;
        }
    }
}

.search_box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;

    label {
        font-size: 16px;
    }
}
</style>
