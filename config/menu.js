
// 注意,这里的Menu和main.js中是同一个对象 !!!!!!!!!!
const { Menu, dialog, BrowserWindow, shell,ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const template = [{},
    {
        label: 'Show',
        submenu: [
            {
                label: 'Basic',
                type: 'radio',  //单选
                checked: true,  //选中
                click: () => {
                    const win = BrowserWindow.fromId(1);    //browserwindow不唯一
                    win.setSize(390,672);
                    win.webContents.send('changeTo','advanced');    //同mainProcess
                },
                accelerator:'CommandOrControl+B'    // 快捷键
            },
            {
                label: 'Advanced', 
                type: 'radio', 
                checked: false,
                click: () => {
                    const win = BrowserWindow.fromId(1);
                    win.setSize(670,460);
                    win.webContents.send('changeTo','basic');
                },
                accelerator:'CommandOrControl+A'
            },
            {type: 'separator'},
            {label: 'Reload',role:'reload'},
            {label: 'Exit',role:'quit'},
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Feedback',
                click: () => {
                    shell.openExternal('https://github.com/lin-xin/calculator/issues');
                }
            },
            {
                label: 'Repository',
                click: () => {
                    shell.openExternal('https://github.com/lin-xin/calculator');
                }
            },
            {type: 'separator'},
            {
                label: 'About Me',
                click: () => {
                    shell.openExternal('http://blog.gdfengshuo.com/about/');
                }
            },
            {
                label: 'About This',
                click: () => {
                    const win = BrowserWindow.fromId(1);
                    let about = new BrowserWindow({
                        parent: win,
                        modal: true,
                        width: 500,
                        height: 300,
                        minimizable: false,
                        maximizable: false,
                        resizable: false,
                        title: 'About This'
                    })
                    ipcMain.on('close_about',()=>{about.close()})
                    about.loadURL(url.format({
                        pathname: path.join(__dirname,'../src/about.html'),
                        protocol: 'file',
                        slashes: true
                    }));
                    // about.webContents.openDevTools();
                    about.setMenu(null);
                    about.once('ready-to-show', () => {
                        about.show();
                    })
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          {role: 'toggledevtools'},
          {type: 'separator'},
          {role: 'resetzoom'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      }
]
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

