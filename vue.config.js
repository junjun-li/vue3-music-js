const registerRouter = require('./backend/router')

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
  }
}
