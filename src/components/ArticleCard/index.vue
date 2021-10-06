<template>
    <div class="article_card">
        <div class="article_head" @click="pathTo('/article', {articleId: articleInfo.articleId})">
            <div class="article_cover" :style="{backgroundImage: `url(${articleInfo.articleCover})`}"></div>
            <h3 class="article_title">
                <span >{{ articleInfo.articleTitle }}</span>
            </h3>
        </div>
        <div class="article_more">
            <i class="icon el-icon-date"></i>
            <span class="push_date">发表于{{ articleInfo.createDate }}</span>
            <i class="icon el-icon-third-yuan"></i>
            <i class="icon el-icon-folder-opened"></i>
            <div>
                <template v-for="item in articleInfo.classTypeList">
                    <span class="underline"
                          :key="item.classId"
                          @click="pathTo('/articleList', {type: 'class', id: item.classId})">
                          {{ item.className }}
                    </span>
                </template>
            </div>
        </div>
        <p class="article_info">{{ articleInfo.articleInfo }}</p>
        <div class="tag-group">
            <template v-for="item in articleInfo.tagTypeList">
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
        </div>
        <el-divider class="article_divider" style="margin: 20px;"></el-divider>
    </div>
</template>

<script>
export default {
    name: "ArticleCard",
    props: {
        articleInfo: {
            type: Object,
            default: function () {
                return {}
            }
        }
    }
}
</script>

<style scoped lang="scss">
.article_card {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 6px;
    box-shadow: $box-shadow-light;
    transition: .3s;

    &:hover {
        box-shadow: $box-shadow-dark;
    }

    .article_head {
        position: relative;
        cursor: pointer;

        .article_cover {
            width: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            transition: .3s;

            &:after {
                display: block;
                content: '';
                padding-top: 50%;
                background: rgba(0, 0, 0, .3);
            }
        }

        &:hover {
            .article_cover {
                background-size: 105% 105%;
            }

            .article_title {
                color: #fff;
                transform: translate(-50%, -50%) scale(1.15);
            }
        }

        .article_title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #e2e2e2;
            font-size: 30px;
            font-weight: 600;
            font-family: '宋体';
            text-align: center;
            transition: .3s;
        }
    }

    .article_more {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #666;
        margin: 10px;

        .icon {
            margin: 0 5px;
        }

        .el-icon-third-yuan {
            font-size: 12px;
            transform: scale(0.5);
        }

        .underline {
            margin-right: 5px;
            position: relative;
            border-bottom: 1px solid #222;
            cursor: pointer;
        }
    }

    .article_info {
        line-height: 20px;
        max-height: 60px;
        margin: 10px 0 15px;
        padding-left: 5px;
        border-left: 2px solid #222;
        border-radius: 0px;
        color: #222;
        font-size: 15px;
        font-weight: 500;
        font-family: '宋体';
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .tag_item {
        margin-left: 10px;
        cursor: pointer;
        border: none;
        line-height: 2;
        box-shadow: 0 2px 10px 1px rgba($--color-black, .1);
    }
}

@media screen and (max-width: 720px) {
    .article_card {
        padding: 10px;

        .article_title {
            font-size: 20px !important;
        }

        .article_info {
            margin: 10px 0;
        }

        .article_divider {
            margin: 10px 0;
        }
    }
}
</style>
