<template>
    <div class="wrapper">
        <div class="container">
            <div class="content">
                <template v-if="loadFail">
                    <div class="load_fail" style="text-align: center;margin-top: 100px;">
                        <img src="/static/img/default_img/no_data.png" alt="">
                        <p style="font-size: 20px;">加载失败</p>
                    </div>
                </template>
                <template v-else>
                    <div v-if="articleData" class="article_wrapper">
                        <div class="article_content">
                            <section class="article_message">
                                <h3 class="article_title" v-text="articleData.articleTitle"></h3>
                                <h4 class="article_subtitle" v-text="articleData.articleSubtitle"></h4>
                                <p class="article_info" v-text="articleData.articleInfo"></p>
                                <div class="article_more">
                                    <i class="icon el-icon-date"></i>
                                    <span class="push_date">发表于{{articleData.createDate}}</span>
                                    <i class="icon el-icon-third-yuan"></i>
                                    <i class="icon el-icon-folder-opened"></i>
                                    <div>
                                        <template v-for="item in articleData.classTypeList">
                                            <span class="underline" :key="item.classId">{{item.className}}</span>
                                        </template>
                                    </div>
                                </div>
                            </section>
                            <section class="article_body">
                                <article class="markdown-body" v-html="compiledMarkdown"></article>
                            </section>
                            <section class="tag-group">
                                <template v-for="item in articleData.tagTypeList">
                                    <el-tag :key="item.tagId"
                                            style="margin-left: 10px; cursor: pointer;"
                                            type="info"
                                            size="small"
                                            effect="dark">
                                        {{ item.tagName }}
                                    </el-tag>
                                </template>
                            </section>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import marked from 'marked'
import highJs from 'highlight.js'
import {getArticleInfo} from '@/api/article'

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, language) {
        const validLanguage = highJs.getLanguage(language) ? language : 'plaintext'
        return highJs.highlight(validLanguage, code).value
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
})

const renderer = {
    image: function (href, title, text) {
        return `<img style="cursor: zoom-in;" src="${href}" alt="${text}" preview="articleImage">`
    }
}

marked.use({ renderer })

export default {
    name: 'ArticlePreview',
    props: {
        articleId: {
            type: String,
            default: ''
        }
    },
    computed: {
        compiledMarkdown () {
            return marked(this.articleData.articleContent || '', { sanitize: true })
        }
    },
    data () {
        return {
            articleData: null,
            loadFail: false
        }
    },
    created () {
        getArticleInfo(this.articleId).then(res => {
            this.articleData = res.data
            // 在数据加载完毕之后调用 实现图片预览
            this.$previewRefresh()
        }).catch(() => {
            this.$message.error('获取信息失败')
            this.loadFail = true
        })
    }
}
</script>

<style scoped>

</style>
