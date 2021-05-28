const registerRouter = require('./backend/router')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    // 自动开启浏览器
    open: true,
    // 一切服务都启用gzip 压缩：
    compress: true,
    // 热模块替换
    hot: true,
    port: 9100,
    // 将运行进度输出到控制台。
    progress: true,
    before (app) {
      registerRouter(app)
    }
  },
  css: {
    sourceMap: process.env.NODE_ENV === `development`,
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  configureWebpack: (config) => {
    // config.output.filename = 'js/[name].[hash:8].js'
    // config.output.chunkFilename = 'js/[name].[hash:8].js'
  }
}
