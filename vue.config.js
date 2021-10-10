const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

const cdn = require('./config/cdn.config')

module.exports = {
    publicPath: "/",
    assetsDir: "static",
    lintOnSave: true,
    runtimeCompiler: true,
    productionSourceMap: false,
    configureWebpack: config => {
        const plugins = [];
        config.externals = {
            'mavon-editor': 'MavonEditor',
            'highlight': 'hljs',
            'marked': 'marked',
            'vue-photo-preview': 'vuePhotoPreview'
        };
        if (IS_PROD) {
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );

            config.plugins = [...config.plugins, ...plugins];
        }
    },
    chainWebpack: (config) => {

        // 添加别名
        config.resolve.alias
            .set("vue$", "vue/dist/vue.esm.js")
            .set("@", resolve("src"));

        // html中添加cdn
        config.plugin("html").tap(args => {
            args[0].cdn = cdn;
            args[0].title = "火星的青青草原";
            return args;
        });

        if (IS_PROD) {
            config.module
                .rule("images")
                .use("image-webpack-loader")
                .loader("image-webpack-loader")
                .options({
                    mozjpeg: {progressive: true, quality: 65},
                    optipng: {enabled: false},
                    pngquant: {quality: [0.65, 0.9], speed: 4},
                    gifsicle: {interlaced: false}
                });
        }

        /* 使用svg组件 */
        const svgRule = config.module.rule("svg");
        svgRule.uses.clear();
        svgRule.exclude.add(/node_modules/);
        svgRule
            .test(/\.svg$/)
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]"
            });

        const imagesRule = config.module.rule("images");
        imagesRule.exclude.add(resolve("src/svg"));
        config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);

        return config;
    },
    css: {
        extract: IS_PROD,
        sourceMap: false,
        loaderOptions: {
            scss: {
                prependData: `@import "@/assets/scss/theme/_handle.scss";$img_url: "~@/assets/images";`
            }
        }
    },
    devServer: {
        overlay: {
            // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true,
        },
        open: false, // 是否打开浏览器
        host: "localhost",
        port: "4000", // 代理断就
        https: false,
        hotOnly: false, // 热更新
        proxy: {
            "/api": {
                target: "http://localhost:90/", // 目标代理接口地址
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }
    }
};
