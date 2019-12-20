const path = require('path');
const resolve = (...dir) => path.resolve(__dirname, ...dir);

module.exports = {
  lintOnSave: false, // 关闭eslint
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('~', resolve('setting'));
  },  
  devServer: {
    https: false,
    hotOnly: false,
    compress: true,
    progress: false,
    watchContentBase: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },        
      }
    }
  }
}