<template>
    <div id="Search">
        <div class="search_module">
            <el-input placeholder="请输入搜索内容" @keyup.enter.native="pathTo('/search', {query})" v-model="query" clearable autofocus>
                <el-button slot="append" icon="el-icon-search" @click="pathTo('/search', {query})"></el-button>
            </el-input>
            <p class="search_total">共<span v-text="pagination.total"></span>篇</p>
        </div>
        <template v-if="articleList.length > 0">
            <div class="article_module">
                <template v-for="article in articleList" >
                    <ArticleCard :article-info="article" :key="article.articleId" />
                </template>
            </div>
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
        <template v-else>
            <div style="margin-top: 7%; text-align: center;" :key="33333">
                <img src="@/assets/images/default_img/no_data.png" alt="">
                <p style="font-size: 20px;">什么都没有</p>
            </div>
        </template>
    </div>
</template>

<script>
import {getArticleList} from '@/api/article'
import ArticleCard from '@/components/ArticleCard'
export default {
    name: "Search",
    components: {
        ArticleCard
    },
    watch: {
        '$route' () {
            this.query = this.$route.query.query || ''
            this.getArticleList(1)
        }
    },
    data () {
        return {
            query: '',
            articleList: [],
            pagination: {
                page: 1,
                pageSize: 7,
                total: 0
            }
        }
    },
    methods: {
        getArticleList (page) {
            let param = {
                page: page,
                pageSize: this.pagination.pageSize,
                query: this.query
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
            this.getArticleList(page)
        }
    },
    mounted () {
        this.query = this.$route.query.query || ''
        this.getArticleList(1)
    }
}
</script>

<style scoped lang="scss">
#Search {
    min-width: 320px;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px 10px;

    .search_module {
        width: 75%;
        margin: 10px auto;

        .search_total {
            margin-top: 10px;
            font-size: 14px;
            color: #666;
            font-weight: 600;

            span {
                margin: 0 5px;
            }
        }
    }

    .article_module {
        width: 75%;
        margin: 0 auto;
        padding: 10px;
        box-sizing: border-box;
    }
}

@media screen and (max-width: 1100px) {
    #Search {
        .search_module {
            width: 95%;
        }

        .article_module {
            width: 100%;
        }
    }
}
</style>
