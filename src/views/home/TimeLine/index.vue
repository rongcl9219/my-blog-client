<template>
    <div id="timeLine">
        <template v-if="list.length > 0">
            <ul class="time_line_module">
                <li class="time_line_item">
                    <p class="time_total">目前共计<span v-text="total"></span>篇文章~</p>
                </li>
                <li class="time_line_item" v-for="year in list" :key="year.year">
                    <h3 class="time_year" v-text="year.year"></h3>
                    <ul class="time_year_content">
                        <li class="time_line_item" v-for="item in year.list" :key="item.articleId">
                            <div class="time_line_content">
                                <h4 class="time_month" @click="pathTo('/article', {articleId: item.articleId})">
                                    <span class="month" v-text="item.month"></span>
                                    <span class="title" v-text="item.articleTitle"></span>
                                </h4>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </template>
        <template v-else>
            <NoData/>
        </template>
    </div>
</template>

<script>
import {getTimeLine} from '@/api/common'
export default {
    name: "TimeLine",
    data () {
        return {
            list: [],
            total: 0
        }
    },
    created () {
        getTimeLine().then(res => {
            this.list = res.data.list
            this.total = res.data.total
        }).catch(() => {})
    }
}
</script>

<style scoped lang="scss">
#timeLine {
    max-width: 860px;
    margin: 30px auto 0;
    padding: 20px 30px 100px;
    box-sizing: border-box;

    .time_line_module {
        position: relative;
        padding-left: 20px;

        &:after {
            content: '';
            position: absolute;
            top: 10px;
            left: 0;
            height: 100%;
            width: 4px;
            @include background_color('background-color4');
        }
    }

    .time_total {
        position: relative;
        @include font_color('text-color2');

        span {
            margin: 0 5px;
        }

        &:after {
            position: absolute;
            content: '';
            top: 4px;
            left: -24px;
            width: 10px;
            height: 10px;
            border: 1px solid;
            border-radius: 50%;
            z-index: 1;
            @include border_color('border-color2');
            @include background_color('background-color1');
        }
    }

    .time_line_content {
        position: relative;
        padding: 30px 0 10px;
        border-bottom: 1px dashed;
        @include border_color('border-color3');
    }

    .time_year {
        position: relative;
        margin-top: 80px;
        font-size: 26px;
        font-weight: 600;
        color: #222;
        @include font_color('text-color1');

        &:after {
            content: '';
            position: absolute;
            top: 7px;
            left: -25px;
            width: 12px;
            height: 12px;
            border: 1px solid;
            border-radius: 50%;
            z-index: 1;
            @include border_color('border-color2');
            @include background_color('background-color5');
        }
    }

    .time_month {
        position: relative;
        display: flex;
        line-height: 24px;
        cursor: pointer;
        transition: .3s;
        @include font_color('text-color3');

        &:hover {
            @include font_color('text-color2');

            &:after {
                background-color: #666;
                @include background_color('background-color7');
            }
        }

        .month {
            font-size: 12px;
            width: 50px;
        }

        &:after {
            content: '';
            position: absolute;
            top: 7px;
            left: -23px;
            width: 8px;
            height: 8px;
            border: 1px solid;
            border-radius: 50%;
            transition: .3s;
            z-index: 1;
            @include border_color('border-color2');
            @include background_color('background-color1');
        }
    }
}
</style>
