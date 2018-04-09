/**
 * 第一步：检查本地的node版本号，是否达到package.json文件中对node版本的要求，
 * 若低于nodepackage.json文件中要求的版本，则直接要求开发者更新自己的node版本。
 * 反之，可开始第二步。
 * 第二步： 通过请求https://registry.npmjs.org/vu...来获取vue-cli的最新
 * 版本号，跟package.json中的version字段进行比较，若本地的版本号小于最新的版
 * 本号，则提示有最新版本可以更新。这里需要注意的是，这里检查版本号并不影响后续
 * 的流程，即便本地的vue-cli版本不是最新的，也不影响构建，仅仅提示一下。
 */
const request = require('request') //http请求工具。
const semver = require('semver') //版本号处理工具。
const chalk = require('chalk') //用于高亮终端打印出来的信息
const packageConfig = require('../package.json')

module.exports = done => {
  // Ensure minimum supported node version is used
  if (!semver.satisfies(process.version, packageConfig.engines.node)) {
    return console.log(chalk.red(
      '  You must upgrade node to >=' + packageConfig.engines.node + '.x to use vue-cli'
    ))
  }

  request({
    url: 'https://registry.npmjs.org/vue-cli',
    timeout: 1000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      const localVersion = packageConfig.version
      if (semver.lt(localVersion, latestVersion)) {
        console.log(chalk.yellow('  A newer version of vue-cli is available.'))
        console.log()
        console.log('  latest:    ' + chalk.green(latestVersion))
        console.log('  installed: ' + chalk.red(localVersion))
        console.log()
      }
    }
    done()
  })
}
