// const {
//     ipcRenderer
// } = require('electron')

const keyboard = document.querySelector('#keyboard')


// 模拟按键后闪烁
const twinkle = ({style}) => {
    style.filter = 'invert(100%)'
    // js修改元素的内联样式, 优先级最高,所以临时用完后果断删除
    setTimeout(() => {
        style.filter = ''
        // ele.style=''
    }, 100);
}

// 按虚拟键盘
const clickKey = char => {
    const num = keyboard.querySelector(`#key_${char}`)
    twinkle(num)
    num.click()
}

// keycode和keychar的映射表
const key_codes = [74, 75, 76, 85, 73, 79, 13, 8]
const key_chars = [1, 2, 3, 4, 5, 6, 'eq', 'del']

// mac上的delete居然是backspace

document.addEventListener('keydown', ({
    keyCode
}) => {
    // console.log(keyCode)
    // 小键盘的数字键
    if (keyCode >= 48 && keyCode <= 57) {
        clickKey(keyCode - 48)
    } else if (key_codes.indexOf(keyCode) !== -1) {
        //非数字按键
        clickKey(key_chars[key_codes.indexOf(keyCode)])
    } else // 非虚拟键盘键
        switch (keyCode) {
            case 27:
                ipcRenderer.send('exit')
                process.exit(0)
                break
            default:
                break
        }

})