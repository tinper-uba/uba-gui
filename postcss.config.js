/**
 * postcss的插件配置
 */

module.exports = {
  plugins: [
    //自动补全浏览器不兼容前缀
    require('autoprefixer'),
    //压缩合并去重
    require('cssnano')
  ]
}
