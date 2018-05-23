# uba-gui

一款可视化跨平台前端集成开发工具，基于 [uba](https://github.com/iuap-design/tinper-uba) 核心思想，快速构建前端工程化项目。通过[templates](https://github.com/uba-templates)提供的最佳实践项目免去优化、配置环境等问题，快速初始化到本地，完成运行、开发、调试、构建、发布、测试等一系列繁琐复杂操作。通过可视化来操作减去了学习命令行成本，安心去开发业务模块，无需担心其他nodejs环境问题。

## 如何下载

通过[Releases](https://github.com/tinper-uba/uba-gui/releases)页面下的提示下载使用

1. [macOSX](http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/uba/gui/download/0.2.0/Uba-GUI-0.2.0.dmg)
2. [windows](http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/uba/gui/download/0.2.0/Uba-GUI%20Setup%200.2.0.exe)


![uba-gui](http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/uba/gui/img/uba-gui.gif)

## 启动命令

1. `npm run dev`

启动`webpack`来运行开发任务、构建主线程资源、渲染线程资源

2. `npm start`

开启主程序`uba GUI`

## 构建 & 生产

`npm run build`

然后使用以下命令：

- `npm run pack`            直接运行的MacOS包
- `npm run pack:mac`        构建macOS标准安装包(.dmg)
- `npm run pack:win`        构建Windows标准安装包(.exe)
