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
            <div style="margin-top: 5%; text-align: center;">
                <img src="@/assets/images/default_img/no_data.png" alt="">
                <p style="font-size: 20px;">什么都没有</p>
            </div>
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
            this.getArticleList(page)
        }
    },
    created() {
        this.getArticleList()
    }
}
</script>

<style scoped lang="scss">
.article_wrap {
    flex: 1;
}
</style>
