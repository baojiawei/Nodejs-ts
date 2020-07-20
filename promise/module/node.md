## 常见的模块有哪些?
- es6Module (import export)
- commonjs规范 (require module, exports)
- seajs cmd require amd(define require) 过时了
- 项目打包 umd 统一模块规范（可以兼容 commonjs + amd + cmd + 挂载到全局上）

## 模块化的好处
- 解决命名冲突问题, 如果用唯一标识解决冲突问题 会导致调用时 路径过长
- 方便管理我们的代码（一个文件一个功能 每个文件都是一个模块）

## commonjs 模块化的规范
- 每个文件都是一个模块
- 我要给别人使用 module.exports 导出给别人用的内容
- 别人用，我就用这个require去引用

> es6模块叫静态导入(变量提升) import()可以支持动态导入 commonjs 动态导入