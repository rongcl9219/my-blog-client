<template>
    <div id="articleManage" v-loading="articleListLoading">
        <div class="search_box">
            <label>文章状态：</label>
            <el-select v-model="articleStatus" size="small" placeholder="请选择" @change="articleStatusChange">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <template v-if="articleList.length == 0 && (articleStatus == 3 || articleStatus == 1)">
            <div style="margin-top: 5%; text-align: center;">
                <img src="@/assets/images/default_img/no_data.png" alt="">
                <p style="font-size: 20px;">没有发现文章</p>
            </div>
        </template>
        <template v-else>
            <el-row :gutter="24">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" style="margin-bottom: 20px"
                        v-show="articleStatus == 0 || articleStatus == 2">
                    <div class="card_item">
                        <el-card class="box-card new_card">
                            <div class="card_back"></div>
                            <div class="card_content" @click="newArticleDialog.dialogVisible = true">
                                <el-button type="text" icon="el-icon-circle-plus-outline"
                                           class="new_article_btn"></el-button>
                            </div>
                        </el-card>
                    </div>
                </el-col>
                <template v-for="article in articleList">
                    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" :key="article.articleId"
                            style="margin-bottom: 20px">
                        <el-link :href="'/admin/articlePreview?articleId='+article.articleId"
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
                                                    <template v-if="articleStatus == 3">
                                                        <p>
                                                            <el-button style="color: #ffa200;" type="text" size="mini"
                                                                       icon="el-icon-third-huifushanchu"
                                                                       @click="recoverArticle(article.articleId)">恢复
                                                            </el-button>
                                                        </p>
                                                    </template>
                                                    <template v-else>
                                                        <p>
                                                            <el-button type="text" size="mini" icon="el-icon-edit"
                                                                       @click="openEditArticleDialog(article.articleId)">
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
                @current-change="currentChange"
                :page-size="pagination.pageSize"
                :current-page.sync="pagination.page"
                :total="pagination.total">
            </el-pagination>
        </template>

        <!--    新增文章弹窗    -->
        <el-dialog
            title="新增文章"
            :visible.sync="newArticleDialog.dialogVisible"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            @close="closeNewArticleDialog('newArticleForm')"
            width="40%">
            <el-form :model="newArticleDialog.newArticleForm" status-icon :rules="formRules"
                     ref="newArticleForm" label-width="100px">
                <el-form-item label="文章标题" prop="articleTitle">
                    <el-input type="text" v-model="newArticleDialog.newArticleForm.articleTitle"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章副标题">
                    <el-input type="text" v-model="newArticleDialog.newArticleForm.articleSubtitle"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章关键词">
                    <el-input type="text" v-model="newArticleDialog.newArticleForm.articleKeyword"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章简介" prop="articleInfo">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                              v-model="newArticleDialog.newArticleForm.articleInfo"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章封面" prop="articleCover">
                    <template v-if="newArticleDialog.newArticleForm.articleCover.length > 0">
                        <div
                            style="float: left; width: 60px; height: 60px; margin-right: 20px; border-radius: 6px; overflow: hidden;">
                            <img style="width: 100%; height: 100%; cursor: pointer;"
                                 :src="newArticleDialog.newArticleForm.articleCover[0].url" preview="articleCover">
                        </div>
                    </template>
                    <el-button type="primary" size="mini" icon="el-icon-upload"
                               @click="newArticleDialog.uploadImgVisible = true">上传封面
                    </el-button>
                    <UploadImage :imgList.sync="newArticleDialog.newArticleForm.articleCover"
                                 :uploadImgVisible.sync="newArticleDialog.uploadImgVisible"
                                 @upload-close="uploadDialogClose"
                                 thumbnail="articleCover"
                                 :limitNum="1"></UploadImage>
                </el-form-item>
                <el-form-item label="所属类型" prop="classType">
                    <el-select v-model="newArticleDialog.newArticleForm.classType" style="width: 100%" multiple
                               @visible-change="classTypeChange" @remove-tag="classTypeRemove" placeholder="请选择">
                        <el-option
                            v-for="item in classTypeOptions"
                            :key="item.classId"
                            :label="item.className"
                            :value="item.classId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章标签" prop="tagType">
                    <el-select v-model="newArticleDialog.newArticleForm.tagType" style="width: 100%" multiple
                               placeholder="请选择">
                        <el-option
                            v-for="item in newArticleDialog.tagTypeOptions"
                            :key="item.tagId"
                            :label="item.tagName"
                            :value="item.tagId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newArticleDialog.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="newArticle('newArticleForm')"
                           v-loading="newArticleDialog.loading">
                    {{ newArticleDialog.loading ? '加载中...' : '保 存' }}
                </el-button>
              </span>
        </el-dialog>

        <!--    编辑文章弹窗    -->
        <el-dialog
            title="编辑文章"
            :visible.sync="editArticleDialog.dialogVisible"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            @close="closeEditArticleDialog('editArticleForm')"
            width="40%">
            <el-form :model="editArticleDialog.editArticleForm" status-icon :rules="formRules"
                     ref="editArticleForm" label-width="100px" v-loading="editArticleDialog.formLoading">
                <el-form-item label="文章标题" prop="articleTitle">
                    <el-input type="text" v-model="editArticleDialog.editArticleForm.articleTitle"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章副标题">
                    <el-input type="text" v-model="editArticleDialog.editArticleForm.articleSubtitle"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章关键词">
                    <el-input type="text" v-model="editArticleDialog.editArticleForm.articleKeyword"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章简介" prop="articleInfo">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                              v-model="editArticleDialog.editArticleForm.articleInfo"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章封面" prop="articleCover">
                    <template v-if="editArticleDialog.editArticleForm.articleCover.length > 0">
                        <div
                            style="float: left; width: 60px; height: 60px; margin-right: 20px; border-radius: 6px; overflow: hidden;">
                            <img style="width: 100%; height: 100%; cursor: pointer;"
                                 :src="editArticleDialog.editArticleForm.articleCover[0].url" preview="articleCover">
                        </div>
                    </template>
                    <el-button type="primary" size="mini" icon="el-icon-upload"
                               @click="editArticleDialog.uploadImgVisible = true">上传封面
                    </el-button>
                    <Upload-Image :imgList.sync="editArticleDialog.editArticleForm.articleCover"
                                  :uploadImgVisible.sync="editArticleDialog.uploadImgVisible"
                                  thumbnail="articleCover"
                                  @upload-close="uploadDialogClose"
                                  :limitNum="1"></Upload-Image>
                </el-form-item>
                <el-form-item label="所属类型" prop="classType">
                    <el-select v-model="editArticleDialog.editArticleForm.classType" style="width: 100%" multiple
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
                    <el-select v-model="editArticleDialog.editArticleForm.tagType" style="width: 100%" multiple
                               placeholder="请选择">
                        <el-option
                            v-for="item in editArticleDialog.tagTypeOptions"
                            :key="item.tagId"
                            :label="item.tagName"
                            :value="item.tagId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editArticleDialog.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateArticle('editArticleForm')"
                           v-loading="editArticleDialog.loading">
                    {{ editArticleDialog.loading ? '加载中...' : '保 存' }}
                </el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import {getArticleList, newArticle, editArticle, deleteArticle, recoverArticle, updatePublish, getArticleInfo} from '@/api/article'
import {getAllClass} from '@/api/class'
import {getAllTag} from '@/api/tag'

import UploadImage from '@/components/UploadImage'

export default {
    name: 'AdminArticle',
    components: {
        UploadImage
    },
    data () {
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
            },
            isEdit: false,
            newArticleDialog: {
                dialogVisible: false,
                loading: false,
                uploadImgVisible: false,
                tagTypeOptions: [],
                newArticleForm: {
                    articleTitle: '',
                    articleSubtitle: '',
                    articleKeyword: '',
                    articleInfo: '',
                    articleCover: [],
                    classType: [],
                    tagType: []
                }
            },
            pagination: {
                page: 1,
                pageSize: 7,
                total: 0
            },
            editArticleDialog: {
                dialogVisible: false,
                formLoading: false,
                loading: false,
                uploadImgVisible: false,
                tagTypeOptions: [],
                editArticleForm: {
                    articleId: '',
                    articleTitle: '',
                    articleSubtitle: '',
                    articleKeyword: '',
                    articleInfo: '',
                    articleCover: [],
                    classType: [],
                    tagType: []
                }
            },
            editContentModel: {
                articleId: '',
                mavonEditorVisible: false
            }
        }
    },
    methods: {
        getArticleList (page) {
            this.articleListLoading = true

            getArticleList({page: page, pageSize: this.pagination.pageSize, articleStatus: this.articleStatus}).then(res => {
                let data = res.data
                this.pagination.page = data.pagination.page
                this.pagination.total = data.pagination.total
                this.articleList = data.articleList
            }).catch(err => {
                console.log(err)
                this.$message.error('获取失败')
            }).finally(() => {
                this.articleListLoading = false
            })
        },
        closeNewArticleDialog (formName) {
            this.newArticleDialog.newArticleForm.articleSubtitle = ''
            this.newArticleDialog.newArticleForm.articleKeyword = ''
            this.newArticleDialog.newArticleForm.articleCover = []
            this.$refs[formName].resetFields()
        },
        newArticle (formName) {
            if (this.newArticleDialog.loading) {
                return false
            }
            this.newArticleDialog.loading = true

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let newData = {
                        articleTitle: this.newArticleDialog.newArticleForm.articleTitle,
                        articleSubtitle: this.newArticleDialog.newArticleForm.articleSubtitle,
                        articleKeyword: this.newArticleDialog.newArticleForm.articleKeyword,
                        articleInfo: this.newArticleDialog.newArticleForm.articleInfo,
                        articleCover: this.newArticleDialog.newArticleForm.articleCover[0].key,
                        classType: this.newArticleDialog.newArticleForm.classType.join(','),
                        tagType: this.newArticleDialog.newArticleForm.tagType.join(',')
                    }

                    newArticle(newData).then(res => {
                        this.$message.success('新增成功')
                        this.getArticleList(1)
                        this.newArticleDialog.dialogVisible = false
                    }).catch(err => {
                        console.log(err)
                        this.$message.error('新增失败')
                    }).finally(() => {
                        this.newArticleDialog.loading = false
                    })
                } else {
                    this.newArticleDialog.loading = false
                    return false
                }
            })
        },
        classTypeChange (flag) {
            if (!flag) {
                let dialogName = this.isEdit ? 'editArticleDialog' : 'newArticleDialog'
                let formName = this.isEdit ? 'editArticleForm' : 'newArticleForm'

                this[dialogName].tagTypeOptions = []
                let tagTypeOptionId = []
                this.allTagList.forEach(tag => {
                    if (this[dialogName][formName].classType.indexOf(tag.classType) > -1) {
                        this[dialogName].tagTypeOptions.push(tag)
                        tagTypeOptionId.push(tag.tagId)
                    }
                })
                if (this[dialogName][formName].tagType.length > 0) {
                    this[dialogName][formName].tagType = this[dialogName][formName].tagType.filter(tag => {
                        return tagTypeOptionId.indexOf(tag) > -1
                    })
                }
            }
        },
        classTypeRemove (val) {
            let dialogName = this.isEdit ? 'editArticleDialog' : 'newArticleDialog'
            let formName = this.isEdit ? 'editArticleForm' : 'newArticleForm'
            let tagArr = this.allTagList.reduce((arr, cur) => {
                if (cur.classType === val) {
                    arr.push(cur.tagId)
                }
                return arr
            }, [])

            this[dialogName][formName].tagType = this[dialogName][formName].tagType.filter(tag => {
                return tagArr.indexOf(tag) === -1
            })
        },
        deleteArticle (articleId) {
            this.$confirm('确定删除该文章？', '提示', {
                type: 'warning',
                confirmButtonText: '删除',
                confirmButtonClass: 'del-btn'
            }).then(() => {
                deleteArticle(articleId).then(res => {
                    this.$message.success('删除成功')
                    this.getArticleList(1)
                }).catch(err => {
                    console.log(err)
                    this.$message.error('删除失败')
                })
            }).catch(() => {

            })
        },
        openEditArticleDialog (articleId) {
            this.editArticleDialog.dialogVisible = true
            this.editArticleDialog.formLoading = true
            this.isEdit = true
            getArticleInfo(articleId).then(res => {
                this.editArticleDialog.editArticleForm.articleId = res.data.articleId
                this.editArticleDialog.editArticleForm.articleTitle = res.data.articleTitle
                this.editArticleDialog.editArticleForm.articleSubtitle = res.data.articleSubtitle
                this.editArticleDialog.editArticleForm.articleKeyword = res.data.articleKeyword
                this.editArticleDialog.editArticleForm.articleInfo = res.data.articleInfo
                this.editArticleDialog.editArticleForm.articleCover.push(res.data.articleCoverInfo)
                res.data.classTypeList.map(classType => {
                    this.editArticleDialog.editArticleForm.classType.push(classType.classId)
                })
                this.classTypeChange(false)
                res.data.tagTypeList.map(tagType => {
                    this.editArticleDialog.editArticleForm.tagType.push(tagType.tagId)
                })
            }).catch(err => {
                console.log(err)
                this.$message.error('获取文章信息失败')
            }).finally(() => {
                this.editArticleDialog.formLoading = false
            })
        },
        closeEditArticleDialog (formName) {
            this.editArticleDialog.editArticleForm.articleId = ''
            this.editArticleDialog.editArticleForm.articleSubtitle = ''
            this.editArticleDialog.editArticleForm.articleKeyword = ''
            this.editArticleDialog.editArticleForm.articleCover = []
            this.isEdit = false
            this.$refs[formName].resetFields()
        },
        updateArticle (formName) {
            if (this.editArticleDialog.loading) {
                return false
            }
            this.editArticleDialog.loading = true

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let editData = {
                        articleId: this.editArticleDialog.editArticleForm.articleId,
                        articleTitle: this.editArticleDialog.editArticleForm.articleTitle,
                        articleSubtitle: this.editArticleDialog.editArticleForm.articleSubtitle,
                        articleKeyword: this.editArticleDialog.editArticleForm.articleKeyword,
                        articleInfo: this.editArticleDialog.editArticleForm.articleInfo,
                        articleCover: this.editArticleDialog.editArticleForm.articleCover[0].key,
                        classType: this.editArticleDialog.editArticleForm.classType.join(','),
                        tagType: this.editArticleDialog.editArticleForm.tagType.join(',')
                    }

                    editArticle(editData).then(res => {
                        this.$message.success('修改成功')
                        this.getArticleList(1)
                        this.editArticleDialog.dialogVisible = false
                    }).catch(err => {
                        console.log(err)
                        this.$message.error('修改失败')
                    }).finally(() => {
                        this.editArticleDialog.loading = false
                    })
                } else {
                    this.editArticleDialog.loading = false
                    return false
                }
            })
        },
        updatePublish (articleId, isPublish) {
            let tip = isPublish === 0 ? '发布' : '取消发布'
            updatePublish({articleId, isPublish}).then(res => {
                this.$message.success(tip + '成功')
                this.getArticleList(1)
            }).catch(err => {
                console.log(err)
                this.$message.error(tip + '失败')
            })
        },
        openUpdateContent (articleId) {
            this.editContentModel.articleId = articleId
            this.editContentModel.mavonEditorVisible = true
        },
        currentChange (page) {
            this.getArticleList(page)
        },
        articleStatusChange (val) {
            this.getArticleList(1)
        },
        recoverArticle (articleId) {
            recoverArticle(articleId).then(res => {
                this.$message.success('恢复成功')
                this.getArticleList(1)
            }).catch(err => {
                console.log(err)
                this.$message.error('删除失败')
            })
        },
        uploadDialogClose () {
            console.log(1)
            this.$previewRefresh()
        }
    },
    created () {
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
