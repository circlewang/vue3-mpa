/*
 * @Author: wangmengyuan
 * @Date: 2023-05-23
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-05-23
 * @FilePath: /vue3-ts-mpa/bin/index.js
 * @Description:
 */

const figlet = require('figlet')
console.log(
  `\r\n ${figlet.textSync('ra-cli', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  })}`
)

const program = require('commander')
program
  .name('demo') // 这个位置 demo 放的是新建项目的命令
  .usage('[options] <command> [<args>]')
  .version(`${require('../package.json').name} ${require('../package.json').version}`)
  .command('create <project-name>')
  .action((projectName, options) => {
    require('./combination')(projectName, options)
  })

program.parse(process.argv)
