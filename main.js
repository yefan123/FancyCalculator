/*
 * @Author: JimJin 
 * @Date: 2018年 5月28日 星期一 16时27分54秒 CST
 * @version: 1.0.0
 * * * * * * * * * * * * * * */

const {
    app,
    BrowserWindow,
    Menu
} = require('electron');
const path = require('path');
const url = require('url');


let win;
// *
global['version'] = app.getVersion();

function createWindow() {
    win = new BrowserWindow({
        width: 600,
        height: 672,
        fullscreen: false,
        resizable: true
    });
    // win.webContents.openDevTools();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index2.html'),
        protocol: 'file',
        slashes: true
    }))
    
    win.on('closed', () => {
        win = null;
    })
    
    // win.toggleDevTools();
}

app.on('ready',()=>{
    // 必须写在'ready'的回调中 :-( 
    require('./config/menu.js');    //相当于静态引用,阻塞执行(￣▽￣)" ----> 目标js文件全部执行..
    createWindow();
} 
);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})



// 注意, dependencies必须在本地安装; dev-dependencies不需