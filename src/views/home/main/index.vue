<template>
    <div id="homePage">
        <div class="banner">
            <div class="banner_bg"></div>
            <div class="banner_mask"></div>
            <div class="banner_info">
                <h2>火星的青青草原</h2>
                <p v-text="webInfo.MOTTO"></p>
            </div>
        </div>
        <div class="container">
            <ArticleList/>
            <HomeWebInfo/>
        </div>
    </div>
</template>

<script>
import ArticleList from './components/ArticleList'
import HomeWebInfo from "./components/WebInfo"
import {mapGetters} from 'vuex'
export default {
    name: 'HomePage',
    components: {
        ArticleList,
        HomeWebInfo
    },
    computed: {
        ...mapGetters('common', [
            'getWebInfo'
        ]),
        webInfo () {
            return this.getWebInfo.webInfo || {}
        }
    }
}
</script>

<style lang="scss">
#homePage {
    .banner {
        position: relative;
        height: calc(100vh - 60px);

        .banner_bg {
            width: 100%;
            height: 100%;
            //background-image: url("../../../../src/assets/images/other/banner.jpg");
            background-image: url("../../../../src/assets/images/other/banner.jpg");
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }

        .banner_mask {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba($Ba0_u, .3);
        }

        .banner_info {
            position: absolute;
            top: 50%;
            left: 50%;
            text-align: center;
            color: $Ga1_u;
            transform: translate(-50%, -50%);

            h2 {
                margin-bottom: 10px;
                font-size: 40px;
                font-weight: 500;
                letter-spacing: 2px;
                transition: .3s;
            }

            & > p {
                font-size: 24px;
                transition: .3s;
            }
        }
    }
}

@media screen and (max-width: 720px) {
    #homePage {
        .container {
            flex-direction: column;
        }

        .banner_info {
            h2 {
                font-size: 32px !important;
            }

            p {
                font-size: 22px !important;
            }
        }
    }
}
</style>
