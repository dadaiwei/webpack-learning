# webpack 完整例子

该例子以 react 项目为例，实现了：

[x]开发环境和生产环境配置分离
<br>
[x]支持 jsx、js 转换
<br>
[x]支持 scss、css 转换及 css 文件抽取
<br>
[x]支持图片字体转换
<br>
[x]模板配置
<br>
[x]提取公共代码
<br>
[x]gzip 压缩

安装相关依赖

```
npm i
```

webpack 配置在 tools 文件夹下

- pathConfig.js：导出入口 js、打包目录、模板目录绝对路径
- webpack-common.config.js：webpack 公共配置
- webpack-dev.config.js：webpack 开发环境配置
- webpack-prod.config.js：webpack 生产环境配置

运行：

`npm run dev`：开启开发者模式，web 服务运行在 localhost:3000
<br>
`npm run build`：开启生产模式，打包到 dist 目录
