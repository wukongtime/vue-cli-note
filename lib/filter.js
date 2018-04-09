// 根据metalsmith.metadata()删除一些不需要的模板文件，而metalsmith.metadata()主要在ask.js中改变的，也就是说ask.js中获取到用户的需求
const match = require('minimatch') //字符匹配工具
const evaluate = require('./eval') //返回某作用下表达式的值

/**
 * files 模板内的所有文件
 * filters meta.js或者meta.json的filters字段
 * data metalsmith.metadata()
 * done  交于下一个metalsmith插件处理
 */
module.exports = (files, filters, data, done) => {
  if (!filters) {
    return done()
  }
  const fileNames = Object.keys(files)
  Object.keys(filters).forEach(glob => {
    fileNames.forEach(file => {
      if (match(file, glob, { dot: true })) {
        const condition = filters[glob]
        if (!evaluate(condition, data)) {
          delete files[file]
        }
      }
    })
  })
  done()
}
