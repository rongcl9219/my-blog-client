<template>
    <div class="theme_module">
        <el-button class="choose_theme" @click.stop="visible = !visible" type="text"><i class="el-icon-third-theme"></i></el-button>
        <transition name="fade">
            <div class="theme_menu" v-show="visible">
                <button class="light_btn" @click="setTheme('light')">light</button>
                <button class="dark_btn" @click="setTheme('dark')">dark</button>
            </div>
        </transition>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: "Theme",
    data () {
        return {
            visible: false
        }
    },
    methods: {
        ...mapActions('setting', [
            'setTheme'
        ]),
        closeTheme () {
            this.visible = false
        }
    },
    created () {
        document.body.addEventListener('click', this.closeTheme)
    },
    destroyed() {
        this.visible = false
        document.body.addEventListener('click', this.closeTheme)
    }
}
</script>

<style scoped lang="scss">
.theme_module {
    position: relative;

    .choose_theme {
        font-size: 20px;
        padding: 0;

        @include font_color('text-color2');
    }

    .theme_menu {
        position: absolute;
        top: 100%;
        left: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-50%);
        padding: 10px;
        border-radius: 5px;
        transition: .3s;
        @include box_shadow('box-shadow2');
        @include background_color('background-color1');

        button {
            cursor: pointer;
            border: 1px solid;
            padding: 3px 6px;
            width: 40px;
            font-size: 13px;
            line-height: 1.2;
            border-radius: 0;
            @include border_color('border-color5');

            &:first-of-type {
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
            }

            &:last-of-type {
                border-left: none;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
            }
        }

        .light_btn {
            color: $Ba2_u;
            background-color: $Ga0_u;
        }

        .dark_btn {
            color: $Ga0_u;
            background-color: $Ba2_u;
        }

    }
}

</style>
