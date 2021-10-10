<template>
    <div class="article_wrap">
        <div class="article_list" v-show="articleList.length > 0">
            <template v-for="article in articleList">
                <ArticleCard :key="article.articleId" :article-info="article" />
            </template>
            <el-pagination
                style="margin: 30px auto;text-align: center;"
                background
                layout="prev, pager, next"
                @current-change="currentChange"
                :page-size="pagination.pageSize"
                :current-page.sync="pagination.page"
                :total="pagination.total">
            </el-pagination>
        </div>
        <div v-show="articleList.length === 0">
            <NoData/>
        </div>
    </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard'
import {getArticleList} from "@/api/article";
export default {
    name: "ArticleList",
    components: {
        ArticleCard
    },
    data () {
        return {
            articleList: [],
            pagination: {
                page: 1,
                pageSize: 5,
                total: 0
            }
        }
    },
    methods: {
        getArticleList(page) {
            getArticleList({page: page, pageSize: this.pagination.pageSize}).then(res => {
                let data = res.data
                this.pagination.page = data.pagination.page
                this.pagination.total = data.pagination.total
                this.articleList = data.articleList
            }).catch(() => {
                this.$message.error('获取失败')
            })
        },
        currentChange (page) {
            const clientHeight = window.innerHeight - 60

            this.pageScrollTo(clientHeight).then(() => {
                this.getArticleList(page)
            })
        }
    },
    created() {
        this.getArticleList()
    }
}
</script>

<style lang="scss">
.article_wrap {
    flex: 1;

    .el-pagination.is-background .el-pager li:not(.disabled).active {
        @include background_color('theme-color');
        @include font_color('text-color6');

        &:hover {
            @include font_color('text-color6');
        }
    }

    .el-pagination.is-background .el-pager li:not(.disabled):hover {
        @include font_color('theme-color');
    }

    .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next, .el-pagination.is-background .el-pager li {
        @include background_color('background-color3');
        @include font_color('text-color7');
    }
}
</style>
