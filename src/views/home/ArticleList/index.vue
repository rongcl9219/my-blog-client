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
            let param = {page: page, pageSize: this.pagination.pageSize}

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
            this.getArticleList(page)
        }
    },
    created() {
        this.getArticleList(1)
    }
}
</script>

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
