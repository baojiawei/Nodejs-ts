// process.env 环境变量 （通过命令行设置环境 来实现不同的效果）
// process.argv 设置执行参数 在执行的时候 传入一些用户自定义的参数（拿过来做本次执行的参数列表）
// create --help xxxx
// 使用别人提供的模块来实现参数的解析(commander webpack(yargs))
const program = require('commander')

program.version('1.0.0')
// program.command('create').action(() => {
//   console.log('创建项目', process.argv)
// })
program.option('-p', '--port <v>', 'set your port', '3000')
program.parse(process.argv)

// process 可以解析整个程序中的参数
// 当前工作目录，默认code running 运行时 是以当前文件夹的根目录为基准，这个就是当前的工作目录
console.log(process.cwd())
// 操作文件 为了防止有歧义 __dirname+文件名
// 当前文件所在的文件夹 此路径不能发生变化
// __dirname不在global上，她是全局变量
// global是全局对象，她上面的属性也是可以直接访问的
console.log(__dirname)