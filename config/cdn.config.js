const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
    css: [
        "https://unpkg.com/element-ui@2.15.5/lib/theme-chalk/index.css",
        "https://cdn.bootcss.com/github-markdown-css/4.0.0/github-markdown.min.css",
        "https://unpkg.com/@highlightjs/cdn-assets@11.2.0/styles/github.min.css",
        "https://unpkg.com/mavon-editor@2.9.1/dist/css/index.css",
        "https://unpkg.com/vue-photo-preview@1.1.3/dist/skin.css"
    ],
    js: [
        `https://unpkg.com/vue@2.6.11/dist/vue${IS_PROD ? '.min' : ''}.js`,
        "https://unpkg.com/vuex@3.4.0/dist/vuex.min.js",
        "https://unpkg.com/vue-router@3.2.0/dist/vue-router.min.js",
        "https://unpkg.com/element-ui@2.15.5/lib/index.js",
        "https://unpkg.com/mavon-editor@2.9.1/dist/mavon-editor.js",
        "https://unpkg.com/@highlightjs/cdn-assets@11.2.0/highlight.min.js",
        "https://cdn.bootcdn.net/ajax/libs/marked/3.0.4/marked.min.js",
        "https://unpkg.com/vue-photo-preview@1.1.3/dist/vue-photo-preview.js"
    ]
}
