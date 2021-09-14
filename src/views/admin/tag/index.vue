<template>
    <div id="tagManage">
        <el-table
            :data="tagTableList"
            v-loading="tagTableLoading"
            row-key="tagId"
            stripe
            style="width: 100%">
            <el-table-column
                prop="index"
                align="center"
                width="50">
            </el-table-column>
            <el-table-column
                prop="tagName"
                label="标签名称"
                align="center"
                min-width="100px">
            </el-table-column>
            <el-table-column
                prop="className"
                label="所属分类"
                align="center"
                min-width="100px">
            </el-table-column>
            <el-table-column
                prop="tagDesc"
                label="标签描述"
                align="center"
                min-width="100px">
            </el-table-column>
            <el-table-column
                prop="createDate"
                label="创建时间"
                align="center"
                min-width="100px">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                align="right"
                width="150">
                <template slot="header" slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="openTagDialog(true)">
                        新增标签
                    </el-button>
                </template>
                <template slot-scope="scope">
                    <el-button type="text" size="small" icon="el-icon-edit" @click="openTagDialog(false, scope.row)">
                        修改
                    </el-button>
                    <el-button type="text" size="small" icon="el-icon-delete" style="color: red;"
                               @click="deleteTag(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="margin: 30px auto;text-align: center;"
            background
            layout="prev, pager, next"
            @current-change="currentChange"
            :page-size="pagination.pageSize"
            :current-page.sync="pagination.page"
            :total="pagination.total">
        </el-pagination>

        <!--   新增标签弹窗   -->
        <el-dialog
            :title="tagDialog.title"
            :visible.sync="tagDialog.dialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            @close="closeTagDiaLog('tagForm')"
            width="40%">
            <el-form :model="tagDialog.tagForm" status-icon :rules="tagDialog.rules" v-loading="tagDialog.loading"
                     ref="tagForm" label-width="100px">
                <el-form-item label="标签名称" prop="tagName">
                    <el-input type="text" v-model="tagDialog.tagForm.tagName"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属分类" prop="classType">
                    <el-select v-model="tagDialog.tagForm.classType" placeholder="请选择">
                        <el-option
                            v-for="item in tagDialog.classTypeOptions"
                            :key="item.classId"
                            :label="item.className"
                            :value="item.classId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签描述">
                    <el-input type="text" v-model="tagDialog.tagForm.tagDesc"
                              autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="tagDialog.dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveTag('tagForm')"
                       :loading="tagDialog.saveFlag">{{ tagDialog.saveFlag ? '保存中...' : '保 存' }}</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import {getTagList, getTagInfo, deleteTag, updateTag, newTag} from '@/api/tag'
import {getAllClass} from '@/api/class'

export default {
    name: 'Tag',
    data () {
        return {
            tagTableList: [],
            tagTableLoading: false,
            pagination: {
                page: 1,
                pageSize: 10,
                total: 0
            },
            tagDialog: {
                dialogVisible: false,
                isNew: true,
                title: '',
                rules: {
                    tagName: [
                        {required: true, message: '请输入标签名称', trigger: 'blur'}
                    ],
                    classType: [
                        {required: true, message: '请选择所属分类', trigger: 'change'}
                    ]
                },
                loading: false,
                saveFlag: false,
                classTypeOptions: [],
                tagForm: {
                    tagId: '',
                    tagName: '',
                    classType: '',
                    tagDesc: ''
                }
            }
        }
    },
    methods: {
        getTagList (page) {
            this.tagTableLoading = true

            getTagList({page: page, pageSize: this.pagination.pageSize}).then(res => {
                let data = res.data
                this.pagination.page = data.pagination.page
                this.pagination.total = data.pagination.total
                this.tagTableList = data.tagList
            }).catch((e) => {
                console.log(e)
                this.$message.error('获取失败')
            }).finally(() => {
                this.tagTableLoading = false
            })
        },
        currentChange (page) {
            this.getTagList(page)
        },
        openTagDialog (isNew, rowData) {
            this.tagDialog.isNew = isNew
            if (isNew) {
                this.tagDialog.title = '新增标签'
            } else {
                this.tagDialog.title = '修改标签'
                this.tagDialog.loading = true
                getTagInfo({tagId: rowData.tagId}).then(res => {
                    this.tagDialog.tagForm.tagId = res.data.tagId
                    this.tagDialog.tagForm.tagName = res.data.tagName
                    this.tagDialog.tagForm.classType = res.data.classType
                    this.tagDialog.tagForm.tagDesc = res.data.tagDesc
                }).catch((e) => {
                    console.log(e)
                    this.$message.error('获取信息失败')
                }).finally(() => {
                    this.tagDialog.loading = false
                })
            }
            this.tagDialog.dialogVisible = true
        },
        closeTagDiaLog (formName) {
            this.tagDialog.tagForm.tagId = ''
            this.tagDialog.tagForm.classType = ''
            this.tagDialog.tagForm.tagDesc = ''
            this.$refs[formName].resetFields()
        },
        saveTag (formName) {
            this.tagDialog.saveFlag = true
            this.tagDialog.loading = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        tagName: this.tagDialog.tagForm.tagName,
                        classType: this.tagDialog.tagForm.classType,
                        tagDesc: this.tagDialog.tagForm.tagDesc
                    }
                    if (this.tagDialog.isNew) {
                        newTag(data).then(() => {
                            this.$message.success('新增成功')
                            this.tagDialog.dialogVisible = false
                            this.getTagList(1)
                        }).catch((e) => {
                            console.log(e)
                            this.$message.error('新增失败')
                        }).finally(() => {
                            this.tagDialog.saveFlag = false
                            this.tagDialog.loading = false
                        })
                    } else {
                        data.tagId = this.tagDialog.tagForm.tagId
                        updateTag(data).then(() => {
                            this.$message.success('修改成功')
                            this.tagDialog.dialogVisible = false
                            this.getTagList(1)
                        }).catch((e) => {
                            console.log(e)
                            this.$message.error('修改失败')
                        }).finally(() => {
                            this.tagDialog.saveFlag = false
                            this.tagDialog.loading = false
                        })
                    }
                } else {
                    this.tagDialog.saveFlag = false
                    this.tagDialog.loading = false
                    return false
                }
            })
        },
        deleteTag (rowData) {
            this.$confirm('是否删除该标签？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteTag({tagId: rowData.tagId}).then(() => {
                    this.$message.success('删除成功')
                    this.getTagList(1)
                }).catch((e) => {
                    console.log(e)
                    this.$message.error('删除失败')
                })
            }).catch(() => {

            })
        }
    },
    created () {
        getAllClass().then(res => {
            this.tagDialog.classTypeOptions = res.data
        }).catch(() => {

        })
        this.getTagList(1)
    }
}
</script>
