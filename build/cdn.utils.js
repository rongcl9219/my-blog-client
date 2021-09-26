/**
 * @description cdn链接配置
 */

// cdn镜像源
const cdnBaseHttp = 'https://unpkg.com'

// 是否使用cnd的js，默认：dev不使用，prod使用
const isExternalJs = true // process.env.NODE_ENV === 'production'

/* cdn配置
name：模块名称，与package.json同名，如：element-ui
scope：模块作用域命名，对应window里面挂载的变量名称，如：ELEMENT
char: 版本号连接符号，如：完整cnd为 https://unpkg.com/element-ui@2.15.6/lib/index.js，则应该填写的为：@
js：js地址，是从版本号后面开始的，如：完整js cnd为 https://unpkg.com/element-ui@2.15.6/lib/index.js，则应该填写的为：lib/index.js
css：css地址，是从版本号后面开始的，如：完整css cnd为 https://unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css，则应该填写的为：lib/theme-chalk/index.css
cndHttp: cdn地址
*/
const cdnConfig = [
    {name: 'vue', scope: 'Vue', char: '@', js: 'dist/vue.min.js'},
    {name: 'vuex', scope: 'Vuex', char: '@', js: 'dist/vuex.min.js'},
    {name: 'vue-router', scope: 'VueRouter', char: '@', js: 'dist/vue-router.min.js'},
    {name: 'element-ui', scope: 'ELEMENT', char: '@', js: 'lib/index.js', css: 'lib/theme-chalk/index.css'},
    {name: 'mavon-editor', scope: 'MavonEditor', char: '@', js: 'dist/mavon-editor.js', css: 'dist/css/index.css'},
    {
        name: 'highlight.js',
        packname: 'highlight-js',
        moduleName: 'highlight',
        scope: 'hljs',
        char: '@',
        js: 'highlight.min.js',
        css: 'styles/github.min.css',
        cndHttp: 'https://unpkg.com/@highlightjs/cdn-assets'
    },
    {
        name: 'marked',
        scope: 'marked',
        char: '/',
        js: 'marked.min.js',
        cndHttp: 'https://cdn.bootcdn.net/ajax/libs/marked'
    },
    {name: 'vue-photo-preview', scope: 'vuePhotoPreview', char: '@', js: 'dist/vue-photo-preview.js', css: 'dist/skin.css'},
    {
        name: 'github-markdown-css',
        char: '/',
        css: 'github-markdown.min.css',
        cndHttp: 'https://cdn.bootcdn.net/ajax/libs/github-markdown-css'
    }
]

// 获取模块版本号
function getModulesVersion () {
    let mvs = {}
    let regexp = /^npm_package_.{0,3}dependencies_/gi
    for (let m in process.env) {
        // 从node内置参数中读取，也可直接import 项目文件进来
        if (regexp.test(m)) {
            // 匹配模块
            // 获取到模块版本号
            mvs[m.replace(regexp, '').replace(/_/g, '-')] = process.env[
                m
                ].replace(/(~|\^)/g, '')
        }
    }
    return mvs
}

// 1、生成完成的cdnConfig；2、处理忽略的资源
function getExternalModules () {
    let externalModules = {} // 要忽略的资源，如 {vue: 'Vue'}
    let dependencieModules = getModulesVersion() // 获取全部的模块和版本号

    cdnConfig.forEach(item => {
        let packname = item.packname || item.name
        // 遍历配置
        if (packname in dependencieModules) {
            let version = dependencieModules[packname]
            // 拼接完整 css 的链接
            item.css = item.css && `${item.cndHttp ? item.cndHttp : cdnBaseHttp + '/' + item.name}${item.char}${version}/${item.css}`
            // 拼接完整 js 的链接
            item.js = item.js && `${item.cndHttp ? item.cndHttp : cdnBaseHttp + '/' + item.name}${item.char}${version}/${item.js}`
            // 新增要忽略的资源
            if (item.scope) {
                let moduleName = item.moduleName || item.name
                externalModules[moduleName] = item.scope
            }
        } else {
            throw new Error(item.name + ' 未安装，请执行npm i --save ' + item.name)
        }
    })

    // 根据isExternalJs，判断是否真正要忽略
    return isExternalJs ? externalModules : {}
}

// 用在 webpack.base.conf.js 里面
exports.externalModules = getExternalModules()

// 用在 webpack.dev.conf.js/webpack.prod.conf.js 里面
exports.cdnConfig = cdnConfig

// 用在 webpack.dev.conf.js/webpack.prod.conf.js 里面
exports.isExternalJs = isExternalJs

