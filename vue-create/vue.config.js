const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  publicPath: '/',
  // port: 9527,
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    // host: '0.0.0.0',
    // public: 'http://21.163.14.104:9527',
    port: 9527,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      },
      '/auth': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/auth': 'auth'
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin()
    ]
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name: name,
    // resolve: {
    //   alias: {
    //     '@': resolve('src'),
    //     '@crud': resolve('src/components/Crud')
    //   }
    // }
  },
  chainWebpack: config => {
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    config.plugin('compression').use(CompressionPlugin).tap(() => [{
      test: /\.js$|\.html$|\.css/,
      threshold: 512,
      deleteOriginalAssets: false
    }])
  },
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/imports.styl'),
      ],
    })
}