/*
 * @Author: 鲍佳玮
 * @Date: 2022-03-02 22:20:56
 * @LastEditors: 鲍佳玮
 * @LastEditTime: 2022-03-02 22:32:22
 * @Description: 根据运算优先级添加括号
 * 现已知一个字符串是由正整数和加减乘除四个运算符(+ - * /)组成。
例如存在字符串 const str = '11+2-3*4+5/2*4+10/5'，现在需要将高优先级运算，用小括号包裹起来，例如结果为 '11+2-(3*4)+(5/2*4)+(10/5)'。注意可能会出现连续的乘除运算，需要包裹到一起。
 */

function addBrackets(expression) {
    const resultArr = []
    // 定义运算符
    const symbolArr = ['+', '-', '*', '/']
    // 定义高优先级运算符
    const highLevelSymbolArr = ['*', '/']
    // 判断某个字符串是否是运算符
    const isSymbolFn = str => symbolArr.includes(str)
    // 判断某个字符串是否是高优先级运算符
    const isHighLevelSymbolFn = str => highLevelSymbolArr.includes(str)
    // 输入表达式的长度
    const expLen = expression.length
    // 标记当前的遍历是否处于高优先级运算符的范围
    let isInBracket = false
    // 记录临时变量
    let currentNum = ''

    for(let i=0;i<expLen;i++) {
        const isSymbol = isSymbolFn(expression[i])
        const isHighLevelSymbol = isSymbol && isHighLevelSymbolFn(expression[i])
        // 处理当前字符是运算符的场景
        if(isSymbol) {
// 处理当前字符是高优先级运算符的场景
            if(isHighLevelSymbol) {
                // 如果当前没有被标记为高优先级运算符，就在前面加个括号
                if(!isInBracket) {
                    currentNum = '(' + currentNum
                }
                // 修改标记状态
                isInBracket = true
                currentNum += expression[i]
            } else {
                // 普通运算符
                if(isInBracket)  {
                    resultArr.push(currentNum + ')')
                    isInBracket = false
                } else {
                    resultArr.push(currentNum)
                }
                resultArr.push(expression[i])
                currentNum = ""
            }
        } else {
            // 是数字，直接进行记录
            currentNum = currentNum + expression[i]
        }
    }
    if(currentNum) {
        resultArr.push(currentNum + (isInBracket?')':''))
    }
    return resultArr.join('')
}

const str = '11+2-3*4+5/2*4+10/5'

console.log(addBrackets(str))