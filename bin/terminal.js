/*
 * @Author: wangmengyuan
 * @Date: 2023-05-23
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-05-23
 * @FilePath: /vue3-ts-mpa/bin/terminal.js
 * @Description:
 */
const { spawn } = require('child_process')

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  commandSpawn
}
