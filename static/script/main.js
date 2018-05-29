

const {
    ipcRenderer
} = require('electron')

const basic = document.querySelector('#basic')
const advanced = document.querySelector('#advanced')
const screen = document.querySelector('#screen')
// 屏幕中的输入框最左边的一个标识符
const cursor = document.createElement('span')
cursor.innerHTML = '>'
cursor.style.cssFloat = 'left'
screen.querySelector('div:last-child').appendChild(cursor);

let script = [];
let fontSize = 19;

function append(symbol, realSymbol) {
    let span = document.createElement('span')
    span.innerHTML = symbol;
    span.style.fontSize = `${fontSize}px`
    screen.querySelector('div:last-child').appendChild(span);
    if (realSymbol)
        script.push(realSymbol);
    else script.push(symbol)
}
// 数学函数
function fn(name,realName) {
    wrap();
    let span = document.createElement('span')
    span.innerHTML = name;
    span.style.fontSize = `${fontSize}px`
    let current = screen.querySelector('div:last-child')
    current.insertBefore(span, current.childNodes[0])
    script.unshift(realName)
}
// // 次方/开根
// function power() {
//     wrap();
//     append(`^`, `**`)
// }
// 删除键
function del() {
    // let list = screen.lastElementChild.children;
    if (script.length > 0) {
        screen.lastElementChild.lastElementChild.remove()
        // list[list.length - 1].remove();
        script.pop();
    }
}

// 被圆括号包围
function wrap() {
    fontSize += 3;
    const current = screen.querySelector('div:last-child');
    let left = document.createElement('span');
    left.innerHTML = '[';
    left.style.fontSize = `${fontSize}px`;
    let right = document.createElement('span');
    right.innerHTML = ']';
    right.style.fontSize = `${fontSize}px`;
    current.insertBefore(left, current.childNodes[0]);
    current.appendChild(right);
    // script = '(' + script + ')'
    script.unshift('(') //返回数组的长度
    script.push(')')
}
// 按下等号
function result() {
    if (!script.length) return;
    let current = screen.querySelector('div:last-child');
    let span = document.createElement('span')
    let equal = document.createElement('span')
    equal.innerHTML = ` = `
    equal.style.fontSize = `${fontSize}px`
    span.style.fontSize = `${fontSize}px`
    span.style.color = 'lime'
    try {
        span.innerHTML = `${eval(script.join(''))}`
    } catch (err) {
        // 表达式输入错误
        span.innerHTML = `ERROR`
        span.style.color = 'red'
    } finally {
        current.appendChild(equal); //' = '
        current.appendChild(span);
        const ele = document.createElement('div');
        // cursor会从原来挂载的地方断开,然后挂到新的地方
        screen.appendChild(ele).appendChild(cursor)
        // ele.innerHTML='&nbsp;'
        script = []
        fontSize = 19;
    }
}

ipcRenderer.on('changeTo', (event, arg) => {
    if (arg === 'basic') {
        basic.style.width = '100%'
        advanced.style.display = 'none'
    } else if (arg === 'advanced') {
        basic.style.width = '50%'
        advanced.style.display = 'flex'
    }
})


// window.onresize=()=>{
//     for(const div of document.querySelectorAll('#keyboard>div>div')){
//         div.style.lineHeight=div.height;
//     }
// }