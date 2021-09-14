<template>
    <div id="classManage">
        <el-table
            :data="classTableList"
            v-loading="classTableLoading"
            row-key="classId"
            stripe
            style="width: 100%">
            <el-table-column
                prop="index"
                align="center"
                width="50">
            </el-table-column>
            <el-table-column
                prop="className"
                label="分类名称"
                align="center"
                min-width="100px">
            </el-table-column>
            <el-table-column
                prop="classCode"
                label="分类编号"
                align="center"
                min-width="100px">
            </el-table-column>
            <el-table-column
                prop="classType"
                label="分类类型"
                align="center"
                min-width="100px">
                <template slot-scope="scope">
                    {{ scope.row.classType | classTypeFilter }}
                </template>
            </el-table-column>
            <el-table-column
                prop="classDesc"
                label="分类描述"
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
                    <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="openClassDialog(true)">
                        新增分类
                    </el-button>
                </template>
                <template slot-scope="scope">
                    <el-button type="text" size="small" icon="el-icon-edit" @click="openClassDialog(false, scope.row)">
                        修改
                    </el-button>
                    <el-button type="text" size="small" icon="el-icon-delete" style="color: red;"
                               @click="deleteClass(scope.row)">删除
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

        <!--   新增分类弹窗   -->
        <el-dialog
            :title="classDialog.title"
            :visible.sync="classDialog.dialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            @close="closeClassDiaLog('classForm')"
            width="50%">
            <el-form :model="classDialog.classForm" status-icon :rules="classDialog.rules"
                     v-loading="classDialog.loading"
                     ref="classForm" label-width="100px">
                <el-form-item label="分类名称" prop="className">
                    <el-input type="text" v-model="classDialog.classForm.className"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类编号" prop="classCode">
                    <el-input type="text" v-model="classDialog.classForm.classCode"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类类型">
                    <el-select v-model="classDialog.classForm.classType" placeholder="请选择">
                        <el-option
                            v-for="item in classDialog.classTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类描述">
                    <el-input type="text" v-model="classDialog.classForm.classDesc"
                              autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="classDialog.dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveClass('classForm')"
                       :loading="classDialog.saveFlag">{{ classDialog.saveFlag ? '保存中...' : '保 存' }}</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import {getClassList, getClassInfo, deleteClass, updateClass, newClass} from '@/api/class'

export default {
    name: 'AdminClass',
    filters: {
        classTypeFilter: function (value) {
            let classTypeStr = ''
            switch (value) {
            case 0:
                classTypeStr = '默认分类'
                break
            case 1:
                classTypeStr = '编程语言'
                break
            case 2:
                classTypeStr = '开发工具'
                break
            case 3:
                classTypeStr = '其他技能'
                break
            }
            return classTypeStr
        }
    },
    data () {
        let checkClassCode = (rule, value, callback) => {
            if (!value.trim()) {
                callback(new Error('请输入分类编号'))
            } else {
                // 正则以大写字母开始，可以包含大写字母和_组成的2-20个字符
                if (!/^[A-Z]([_A-Z]{1,19})$/.test(value)) {
                    callback(new Error('分类编号必须是以大写字母开始，可以包含大写字母和_组成的2-20个字符'))
                } else {
                    callback()
                }
            }
        }
        return {
            classTableList: [],
            classTableLoading: false,
            pagination: {
                page: 1,
                pageSize: 10,
                total: 0
            },
            classDialog: {
                dialogVisible: false,
                isNew: true,
                title: '',
                rules: {
                    className: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'}
                    ],
                    classCode: [
                        {validator: checkClassCode, required: true, trigger: 'blur'}
                    ]
                },
                classTypeOptions: [
                    {value: 0, label: '默认分类'},
                    {value: 1, label: '编程语言'},
                    {value: 2, label: '开发工具'},
                    {value: 3, label: '其他技能'}
                ],
                loading: false,
                saveFlag: false,
                classForm: {
                    classId: '',
                    classCode: '',
                    className: '',
                    classType: 0,
                    classDesc: ''
                }
            }
        }
    },
    methods: {
        getClassList (page) {
            this.classTableLoading = true

            getClassList({page: page, pageSize: this.pagination.pageSize}).then(res => {
                let data = res.data
                this.pagination.page = data.pagination.page
                this.pagination.total = data.pagination.total
                this.classTableList = data.classList
            }).catch(() => {
                this.$message.error('获取失败')
            }).finally(() => {
                this.classTableLoading = false
            })
        },
        currentChange (page) {
            this.getClassList(page)
        },
        openClassDialog (isNew, rowData) {
            this.classDialog.isNew = isNew
            if (isNew) {
                this.classDialog.title = '新增分类'
            } else {
                this.classDialog.title = '修改分类'
                this.classDialog.loading = true
                getClassInfo({classId: rowData.classId}).then(res => {
                    if (res.code === 200) {
                        this.classDialog.classForm.classId = res.data.classId
                        this.classDialog.classForm.classCode = res.data.classCode
                        this.classDialog.classForm.className = res.data.className
                        this.classDialog.classForm.classType = res.data.classType
                        this.classDialog.classForm.classDesc = res.data.classDesc
                    } else {
                        this.$message.error('获取信息失败')
                    }
                }).catch().finally(() => {
                    this.classDialog.loading = false
                })
            }

            this.classDialog.dialogVisible = true
        },
        closeClassDiaLog (formName) {
            this.classDialog.classForm.classId = ''
            this.classDialog.classForm.classType = 0
            this.classDialog.classForm.classDesc = ''
            this.$refs[formName].resetFields()
        },
        saveClass (formName) {
            this.classDialog.saveFlag = true
            this.classDialog.loading = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        classCode: this.classDialog.classForm.classCode,
                        className: this.classDialog.classForm.className,
                        classType: this.classDialog.classForm.classType,
                        classDesc: this.classDialog.classForm.classDesc
                    }
                    if (this.classDialog.isNew) {
                        newClass(data).then(res => {
                            if (res.code === 200) {
                                this.$message.success('新增成功')
                                this.classDialog.dialogVisible = false
                                this.getClassList(1)
                            } else {
                                this.$message.error('新增失败')
                            }
                        }).catch(() => {

                        }).finally(() => {
                            this.classDialog.saveFlag = false
                            this.classDialog.loading = false
                        })
                    } else {
                        data.classId = this.classDialog.classForm.classId
                        updateClass(data).then(res => {
                            if (res.code === 200) {
                                this.$message.success('修改成功')
                                this.classDialog.dialogVisible = false
                                this.getClassList(1)
                            } else {
                                this.$message.error('修改失败')
                            }
                        }).catch(() => {

                        }).finally(() => {
                            this.classDialog.saveFlag = false
                            this.classDialog.loading = false
                        })
                    }
                } else {
                    this.classDialog.saveFlag = false
                    this.classDialog.loading = false
                    return false
                }
            })
        },
        deleteClass (rowData) {
            this.$confirm('是否删除该分类？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteClass({classId: rowData.classId}).then(res => {
                    if (res.code === 200) {
                        this.$message.success('删除成功')
                        this.getClassList(1)
                    } else {
                        this.$message.error('删除失败')
                    }
                })
            }).catch(() => {

            })
        }
    },
    created () {
        this.getClassList(1)
    }
}
</script>
