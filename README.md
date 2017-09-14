# show-case

## 简介

- 基于 gulp 打包工具打包
- JavaScript 使用CMD模式打包
- 自动压缩雪碧图
- css 自动加 hack
- 集成了富文本（如果不需要，建议把ueditor删掉）

发生产打包时还加入了

- js、css 压缩
- js、css 静态文件名加 md5
- 静态图片压缩
- html 压缩

## 开发及构建

### 目录结构
```bash
├── /gulp/           # gulp 打包源码
├── /node_modules/   # gulp 打包依赖插件
├── /bin/            # 项目输出目录
├── /app/            # 项目源码目录
│ ├── /config/       # 前后台接口配置文件
│ ├── /images/       # 雪碧图存放地址
│ │  └── /others/    # 静态图片存放地址
│ ├── /scripts/      # 通用 js
│ ├── /styles/       # 通用 css
│ └── /views/        # 视图文件
│    └── layout.html # 页面布局总入口
├── package.json     # 项目信息
└── gulpfile.js      # gulp 配置入口

```


### 开始使用

首先安装 NodeJs 和 全局 `gulp`。成功安装 NodeJs 后，执行下面命令安装全局`gulp`。

```
npm i -g gulp
```

切换到项目目录，执行如下命令初始化项目。

```
npm install
```

此次安装需要下载打包依赖的所有第三方插件，可能需要较长时间，请耐心等待。。。

## 常用命令

```
npm run b(/build) # 生产打包
npm run w(/watch) # 启动实时监听
npm run c(/clean) # 清理已编译的代码
npm start         # 前台自启
```



