<template>
    <div id="homePage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <p style="color: rgb(107, 132, 148);"><span class="header_title" style="margin-right: 20px;">欢迎光临</span>【RongCL博客后台】
                </p>
            </div>
            <el-card class="box-card" style="margin-bottom: 20px">
                <div slot="header" class="clearfix">
                    <span class="header_title">关于开源项目【RongCL】</span>
                </div>
                <div>
                    <h3 class="header_title">项目相关</h3>
                    <ul>
                        <li class="list_item about"><span class="list_item_title"><i
                            class="el-icon-third-yuan list_icon"></i>博主网站首页：</span>
                            <el-link :underline="false" type="primary" target="_blank" href="http://rongcl.club">
                                http://rongcl.club
                            </el-link>
                        </li>
                        <li class="list_item about"><span class="list_item_title"><i
                            class="el-icon-third-yuan list_icon"></i>开源项目地址：</span>
                            <el-link :underline="false" type="primary" target="_blank"
                                     :href="github">{{github}}
                            </el-link>
                        </li>
                        <li class="list_item about"><span class="list_item_title"><i
                            class="el-icon-third-yuan list_icon"></i>前台项目地址：</span>
                            <el-link :underline="false" type="primary" target="_blank"
                                     :href="clientGithub">
                                {{clientGithub}}
                            </el-link>
                        </li>
                        <li class="list_item about"><span class="list_item_title"><i
                            class="el-icon-third-yuan list_icon"></i>后台项目地址：</span>
                            <el-link :underline="false" type="primary" target="_blank"
                                     :href="adminGithub">
                                {{adminGithub}}
                            </el-link>
                        </li>
                    </ul>
                </div>
            </el-card>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="header_title">最近发布</span>
                        </div>
                        <div>
                            <ul>
                                <li class="list_article" v-for="o in 4" :key="o">
                                    <el-link :underline="false"><span class="list_time">2020-11-04 13:21</span><span
                                        class="article_title">RonCL简介{{ o }}</span></el-link>
                                </li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="header_title">近期评论</span>
                        </div>
                        <div>
                            <h3 class="header_title">项目相关</h3>
                            <ul>
                                <li>开源项目地址</li>
                                <li>博主网站首页</li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'AdminMain',
    data () {
        return {
            github: 'https://github.com/rongcl9219',
            clientGithub: 'https://github.com/rongcl9219/my-blog-client',
            adminGithub: 'https://github.com/rongcl9219/my-blog-server'
        }
    }
}
</script>

<style lang="scss">
#homePage {
    .header_title {
        color: #42657b;
        font-size: 20px;
    }

    .about {
        padding-left: 20px;
    }

    .list_item {
        display: flex;
        align-items: center;
        line-height: 28px;
        color: #42657b;

        .list_item_title {
            display: flex;
            align-items: center;
        }

        .list_icon {
            margin-right: 10px;
            font-size: 12px;
            transform: scale(.7);
        }

        a {
            text-decoration: none;
            color: #11a2e0;
        }
    }

    .list_article {
        height: 28px;

        .list_time {
            font-size: 15px;
        }

        .article_title {
            font-size: 15px;
            padding-left: 10px;
            color: #11a2e0;
        }
    }
}
</style>
