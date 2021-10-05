<template>
    <div id="articlePage" class="container">
        <template v-if="loadFail">
            <div class="load_fail" style="text-align: center;margin-top: 100px;">
                <img src="/static/assets/img/default_img/no_data.png" alt="">
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
                            <span class="push_date">发表于{{ articleData.createDate }}</span>
                            <i class="icon el-icon-third-yuan"></i>
                            <i class="icon el-icon-folder-opened"></i>
                            <div>
                                <template v-for="item in articleData.classTypeList">
                                    <span class="underline" :key="item.classId"
                                          @click="pathTo('/articleList', {type: 'class', id: item.classId})">{{
                                            item.className
                                        }}</span>
                                </template>
                            </div>
                        </div>
                    </section>
                    <section class="article_body">
                        <article class="markdown-body" v-html="articleHtml"></article>
                    </section>
                    <section class="tag-group">
                        <template v-for="item in articleData.tagTypeList">
                            <el-tag :key="item.tagId"
                                    class="tag_item"
                                    :style="{backgroundColor: getBgColor()}"
                                    type="info"
                                    size="small"
                                    effect="dark"
                                    @click="pathTo('/articleList', {type: 'tag', id: item.tagId})">
                                {{ item.tagName }}
                            </el-tag>
                        </template>
                    </section>
                    <section class="comment">
                        <Comment-Box :articleId="articleId"></Comment-Box>
                    </section>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import CommentBox from '@/components/CommentBox'
import {getArticleInfo} from '@/api/article'
import marked from 'marked'
import highJs from 'highlight'

let rendererMD = new marked.Renderer()

marked.setOptions({
    renderer: rendererMD,
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

rendererMD.image = function (href, title, text) {
    return `<img style="cursor: zoom-in;" src="${href}" alt="${text}" preview="articleImage">`
}

export default {
    name: 'Article',
    components: {
        'Comment-Box': CommentBox
    },
    props: {
        articleId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            articleData: null,
            loadFail: false,
            articleMenu: [],
            articleHtml: ''
        }
    },
    methods: {
        setContentHtml() {
            let index = 1
            rendererMD.heading = function (text, level) {
                return `<h${level} class="article_menu_item" id="article_menu_${index++}">${text}</h${level}>`
            }

            this.articleHtml = marked(this.articleData.articleContent || '', {sanitize: true})
        },
        pathTo (path, query) {
            this.$router.push({
                path: path,
                query: query
            })
        },
    },
    created () {
        getArticleInfo(this.articleId).then(res => {
            this.articleData = res.data
            this.setContentHtml()
            // 在数据加载完毕之后调用 实现图片预览
            this.$previewRefresh()
        }).catch(() => {
            this.loadFail = true
            this.$message.error('获取失败')
        })
    }
}
</script>

<style scoped lang="scss">
#articlePage {
    min-height: calc(100vh - 60px);

    .article_wrapper {
        flex: 1;
    }

    .comment {
        margin: 20px 0;
    }

    .tag_item {
        margin-left: 10px;
        cursor: pointer;
        border: none;
        line-height: 2;
    }
}
</style>
