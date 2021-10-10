<template>
    <div id="articleList">
        <template v-if="articleList.length > 0">
            <div class="article_module" :key="12321312">
                <template v-for="article in articleList" >
                    <ArticleCard :article-info="article" :key="article.articleId" />
                </template>
            </div>
            <el-pagination
                :key="222222"
                style="margin: 30px auto;text-align: center;"
                background
                layout="prev, pager, next"
                @current-change="currentChange"
                :page-size="pagination.pageSize"
                :current-page.sync="pagination.page"
                :total="pagination.total">
            </el-pagination>
        </template>
        <template v-else>
            <NoData/>
        </template>
    </div>
</template>

<script>
import {getArticleList} from '@/api/article'
import ArticleCard from '@/components/ArticleCard'

export default {
    name: "ArticleList",
    components: {
        ArticleCard
    },
    props: {
        type: {
            type: String,
            default: ''
        },
        typeId: {
            type: String,
            default: ''
        }
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
        getArticleList (page) {
            let param = {page: page, pageSize: this.pagination.pageSize, articleStatus: 1}

            if (this.type === 'class') {
                param.classType = this.typeId
            } else if (this.type === 'tag') {
                param.tagType = this.typeId
            }

            getArticleList(param).then(res => {
                let data = res.data
                this.pagination.page = data.pagination.page
                this.pagination.total = data.pagination.total
                this.articleList = data.articleList
            }).catch(() => {
                this.articleList = []
            })
        },
        currentChange (page) {
            this.pageScrollTo().then(() => {
                this.getArticleList(page)
            })
        }
    },
    created() {
        this.getArticleList(1)
    }
}
</script>

<style lang="scss">
#articleList {
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

<style scoped lang="scss">
#articleList {
    overflow: hidden;

    .article_module {
        width: 75%;
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 10px 20px;
        box-sizing: border-box;
    }

    @media screen and (max-width: 1100px) {
        .article_module {
            width: 100%;
        }
    }
}
</style>
