<template>
    <div id="articlePage">
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
                                          @click="pathTo('/articles', {type: 'class', id: item.classId})">{{
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
                                    style="margin-left: 10px; cursor: pointer;"
                                    type="info"
                                    size="small"
                                    effect="dark"
                                    @click="pathTo('/articles', {type: 'tag', id: item.tagId})">
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
export default {
    name: 'Article'
}
</script>

<style scoped>

</style>
