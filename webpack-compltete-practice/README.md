# webpack 完整案例

该例子以 react 项目为例，实现了：

1.开发环境和生产环境配置分离
<br> 2.支持 jsx、js 转换
<br> 3.支持 scss、css 转换及 css 文件抽取
<br> 4.支持图片字体转换
<br> 5.模板配置
<br> 6.提取公共代码
<br>
7.gzip 压缩
<br> 8.开发服务器配置
<br> 9.生产环境打包分析

安装相关依赖

```
npm i
```

src 目录为 react 项目目录，其中：

- css 目录：存放 css 文件
- font 目录：字体目录
- image 目录：图片目录
- views 目录：组件目录
- index.js：入口文件

webpack 配置在 tools 文件夹下

- pathConfig.js：导出入口 js、打包目录、模板目录绝对路径
- webpack-common.config.js：webpack 公共配置
- webpack-dev.config.js：webpack 开发环境配置
- webpack-prod.config.js：webpack 生产环境配置

运行：

`npm run dev`：开启开发者模式，web 服务运行在 localhost:3000。
<br>
`npm run build`：开启生产模式，打包到 dist 目录
