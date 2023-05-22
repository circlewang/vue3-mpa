/*
 * @Author: wangmengyuan
 * @Date: 2023-05-23
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-05-23
 * @FilePath: /vue3-ts-mpa/bin/combination.js
 * @Description:
 */
const { promisify } = require('util')
const figlet = require('figlet')
const inquirer = require('inquirer')
const ora = require('ora')
const download = promisify(require('download-git-repo'))
const { commandSpawn } = require('./terminal')

const vueRepo = 'direct:https://gitee.com/XXXXXXXXXXXX.git' // 脚手架模板的远程仓库地址
const spinner = ora('加载中...')

const createProjectAction = async (projectName, options) => {
  await download(vueRepo, projectName, { clone: true })

  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${projectName}` })

  commandSpawn(command, ['run', 'dev'], { cwd: `./${projectName}` })
  spinner.succeed()
}

module.exports = function (projectName, options) {
  inquirer
    .prompt([
      {
        name: 'project',
        type: 'list',
        message: '请选择模板',
        choices: [
          {
            name: '私有脚手架', // 脚手架名称
            value: 1,
            description: '私有脚手架', // 脚手架描述
            checked: true
          }
        ]
      }
    ])
    .then((data) => {
      spinner.start()
      createProjectAction(projectName, options)
    })
}
