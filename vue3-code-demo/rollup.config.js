/*
 * @Author: 鲍佳玮
 * @Date: 2022-01-28 16:29:10
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-01-28 20:56:02
 * @Description: rollup配置文件
 */
import ts from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import serve from 'rollup-plugin-serve'
import path from 'path'

export default {
  input: 'src/index.ts',
  output: {
    name: 'VueReactivity',
    format: 'umd',
    file: path.resolve(__dirname, 'dist/vue.js'),
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      extensions: ['.ts']
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    serve({
      open: true,
      openPage: path.resolve(__dirname, '/public/index.html'),
      port: 3000,
      contentBase: ''
    })
  ]
}
