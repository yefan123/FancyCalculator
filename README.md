# calculator
基于 Electron + ES6 实现的桌面计算器应用。

<!-- 相关文章：[Electron 实战桌面计算器应用]() -->

## 介绍
我这里通过 Electron 实现了仿 iPhone 的计算器，通过菜单可以切换横屏和竖屏，横屏有更多的运算。

而对于 JavaScript 进行浮点数计算来说，精度丢失是个很大问题，所以我这里使用了第三方库 math.js 来解决这个精度的问题。 

尽可能的实现了跟 iPhone 一样的运算：

- 1 + 2 × 3 = 7
- 3 += 6 (再按 = 等于 9)
- 0.1 + 0.2 = 0.3 (浮点数精度处理)

## 效果图
![Image text]()
![Image text](./demo/1.jpg)

## 环境

- maxOS v10.13.4+
- Electron v2.0.0

## 运行
```
git clone https://github.com/JinHengyu/FancyCalculator.git
npm install
npm start
```

## 打包
```
npm run package
```
则会在项目中生成个 /计算器-win32-x64 文件夹，打开里面的 计算器.exe 即可打开计算器。
