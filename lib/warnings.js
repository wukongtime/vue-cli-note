const chalk = require('chalk')

module.exports = {
  v2SuffixTemplatesDeprecated (template, name) {
    const initCommand = 'vue init ' + template.replace('-2.0', '') + ' ' + name
    // 提示带“-2.0”的模板已经弃用了，官方模板默认用2.0了。不需要用“-2.0”来区分vue1.0和vue2.0了。
    console.log(chalk.red('  This template is deprecated, as the original template now uses Vue 2.0 by default.'))
    console.log()
    console.log(chalk.yellow('  Please use this command instead: ') + chalk.green(initCommand))
    console.log()
  },
  v2BranchIsNowDefault (template, name) {
    const vue1InitCommand = 'vue init ' + template + '#1.0' + ' ' + name
    // 这个方法在vue-init文件中已经被注释掉，不再使用了。在vue1.0向vue2.0过渡的时候用到过，现在都是默认2.0了，自然也就不用了。
    console.log(chalk.green('  This will install Vue 2.x version of the template.'))
    console.log()
    console.log(chalk.yellow('  For Vue 1.x use: ') + chalk.green(vue1InitCommand))
    console.log()
  }
}
