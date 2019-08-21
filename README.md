# webpack 入门

## 前言

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;webpack 作为前端领域的模块化打包工具，相信大家都不陌生。现在很火的 react 和 vue 的一些脚手架都是基于 webpack 开发定制的，因此，了解并会配置 webpack 还是很有必要的（文章基于 webpack4.x 版本来讲解）。

## 1.webpack 是什么

**官方定义**：
<br>
webpack 是一个现代 JavaScript 应用程序的静态模块打包器。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

**个人理解**：
<br>
webpack 作为一个模块化打包工具，根据入口文件（任何类型文件，不一定是 js 文件）递归处理模块中引入的 js/css/scss/image 等文件，将其转换打包为浏览器可以识别的基础文件（js/css/image 文件等）。

![webpack](./image/webpack.png)

**与 grunt/gulp 等区别：**
<br>
1.runt 与 gulp 属于自动化流程工具，通过配置文件指明对哪些文件执行编译、组合、压缩等具体任务，由工具自动完成这些任务。
<br>
2.webpack 作为模块化打包工具，把项目作为一个整体，通过入口文件，递归找到所有依赖文件，通过 loader 和 plugin 针对文件进行处理，最后打包生成不同的 bundle 文件。

## 2.webpack 基本配置

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当你想使用 webpack 打包项目时，需要在项目目录下新建 webpack.config.js，webpack 默认会读取 webpack.config.js 作为配置文件，进而执行打包构建流程。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;先来看一下 webpack 的基本配置项，留个印象先。

**webpack.config.js**

```
const path = require('path');

module.exports = {
  mode: 'production/development/none', // 打包模式，使用对应模式的内置优化
  entry: './src/index.js', // 入口，支持单入口、多入口
  output: { // 输出相关配置
    filename: 'xx.js', // 输出文件的文件名
    path: path.resolve(__dirname, 'dist') // 输出文件的绝对路径，默认为dist
  },
  module: { // 针对不同类型文件的转换
    rules: [
      {
        test: /\.xx$/, // 针对某类型文件处理，使用正则匹配文件
        use: [
          {
            loader: 'xx-loader', // 使用xx-loader进行转换
            options: {} // xx-loader的配置
          }
        ]
      }
    ]
  },
  plugins: [ // 插件，完成特定任务，如压缩/拆分
    new xxPlugin({ options });
  ]
};

```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;webpack 有五个概念：入口(entry)、输出(output)、模式（mode）、loader、插件(plugins)。

## 2.1.入口（entry）

入口指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。默认值为`./src`。

### 2.1.1.单入口

单入口是指 webpack 打包只有一个入口，单入口支持单文件和多文件打包。

> 通常像 vue/react spa 应用都属于单入口形式，以`src/index.js`作为入口文件。

（1）单文件打包

> 不指定入口文件的 entryChunkName 时，默认为 main。

```
// webpack.config.js

module.exports = {
  entry: "./src/index.js"
};
```

上面的单入口语法，是下面的简写：

```
module.exports = {
  entry: {
    main: "./src/index.js"
  }
};
```

main 表示 entryChunkName 为 main，打包后生成的文件 filename 为 main。

webpack 打包后，dist 文件夹生成 main.js 文件。

![webpack打包单文件](./image/webpack单入口文件打包.png)

也可以将 entryChunkName 修改为其他值，打包出的 filename 也会对应改变。

（2）多文件打包

多文件打包入口以数组形式表示，表示将多个文件一起注入到 bundle 文件中。

```
module.exports = {
  entry: ["./src/index.js", "./src/main.js"]
};

```

### 2.1.2.多入口

多入口是指 webpack 打包有多个入口模块，多入口 entry 一般采用对象语法表示，应用场景：

（1）分离应用程序 app 和第三方入口(vendor)

```
module.exports = {
  entry: {
    app: "./src/index.js",
    vendor: "./src/vendor.js"
  }
};
```

webpack 打包后，生成应用程序 app.js 和 vendor.js。

![分离应用程序和第三方](./image/分离app和vendor.png)

（2）多页面打包，一般指多个 html 文档形式，每个文档只使用一个入口。

```
module.exports = {
  entry: {
    app: "./src/app.js",
    home: "./src/home.js",
    main: "./src/main.js"
  }
};
```

webpack 打包后，dist 文件夹下生成 app.js、home.js、main.js 三个文件。

![多入口打包](./image/多入口打包.png)

## 2.2.输出（output）

output 选项可以控制 webpack 如何输出打包文件，output 属性包含 2 个属性：

- filename：输出文件的文件名
- path：输出目录的绝对路径（注意是绝对路径）

> 即使存在多个入口起点，webpack 只有一个输出配置，不对 output 进行配置时，默认输出到./dist 文件夹。

### 2.2.1.单入口输出

单入口打包常用配置如下：

```
const path = require("path");

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist") // __dirname表示js文件执行的绝对路径，使用path.resolve生成dist文件夹的绝对路径
  }
};
```

webpack 打包后，dist 文件夹下生成 bundle.js 文件

![单入口输出](./image/单入口输出.png)

### 2.2.2.多入口输出

当存在多入口时，应该使用占位符来确保每个文件具有唯一的名称，否则 webpack 打包会报错。
![webpack打包报错](./image/webpack打包报错.png)

> **占位符 name 与 entry 对象中的 key 一一对应**。

正确的写法如下：

```
const path = require("path");

module.exports = {
  entry: {
    app: "./src/app.js",
    main: "./src/main.js",
    home: "./src/home.js"
  },
  output: {
    filename: "[name].js", // 使用占位符来表示
    path: path.resolve(__dirname, "dist")
  }
};
```

webpack 打包后，在 dist 文件夹下生成了 app.js、home.js、main.js 文件。

![多入口输出](./image/多入口输出.png)

### 2.2.3.hash、chunkhash、contenthash 揭秘

在揭秘 hash、chunkhash、contenthash 之前，我们先看下 webpack 打包输出信息。

![webpack打包信息](./image/webpack打包信息.png)

Hash：与整个项目构建相关，当项目中不存在文件内容变更时，hash 值不变，当存在文件修改时，会生成新的一个 hash 值。
<br>
Version：webpack 版本
<br>
Time：构建时间
<br>
Build at：开始构建时间
<br>
Asset：输出文件
<br>
Size：输出文件大小
<br>
Chunks：chunk id
<br>
ChunkNames：对应 entryChunkName
<br>
Entrypoint：入口与输出文件的对应关系

如果使用占位符来表示文件，当文件内容变更时，仍然生成同样的文件，无法解决浏览器缓存文件问题。借助于 hash、chunkhash、contenthash 可以有效解决问题。

#### （1）hash

整个项目构建生成的一个 md5 值，项目文件内容不变，hash 值不变。

使用 hash 关联输出文件名称

```
const path = require("path");

module.exports = {
  entry: {
    app: "./src/app.js",
    main: "./src/main.js",
    home: "./src/home.js"
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  }
};

```

> filename: "[name].[hash:7].js"表示去 hash 值的前 7 位

webpack 打包，看到新生成文件带上了 hash 值

![hash](./image/hash.png)

当我们修改 app.js 文件内容后，重新打包，发现可以生成了新的 hash 值，所有文件的名称都发生了变更。

![新hash](./image/新hash.png)

**问题**：当我修改了项目中的任何一个文件时，导致未修改文件缓存都将失效。

#### （2）chunkhash

webpack 构建时，根据不同的入口文件，构建对应的 chunk，生成对应的 hash 值，每个 chunk 的 hash 值都是不同的。

使用 chunkhash 关联文件名

```
const path = require("path");

module.exports = {
  entry: {
    app: "./src/app.js",
    main: "./src/main.js",
    home: "./src/home.js"
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist")
  }
};

```

使用 webpack 打包后，dist 目录下，每个 bundle 文件都带有不同的 chunkash 值。

![chunkhash](./image/chunkhash.png)

修改 app.js 内容，重新打包，只有 app 文件名称发生了变更。

![新chunkash](./image/新chunkhash.png)

使用 chunkhash 可以有效解决 hash 缓存失效问题，但是当在 js 文件里面引入 css 文件时，将 js、css 分别打包，若 js 件内容变化时，css 文件名称也会变更。

app.js 中引入了 css 文件

```
import "./css/style.css";

console.log("app");
```

webpack 配置

```
const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.js",
    main: "./src/main.js",
    home: "./src/home.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(), // 清空dist目录
    new miniCssExtractPlugin({
      // 抽离css文件
      filename: "css/style.[chunkhash].css"
    })
  ]
};
```

打包，dist 文件夹下生成了 css 与 js 文件，chunkhash 一致。

![chunkhash-css-js](./image/chunkhash-css-js.png)

当我们修改 app.js 文件内容后，重新打包，发现 css 文件名也变更了，css 文件缓存将失效，这显然不是我们想要的结果。

![chunk-css-js1](./image/chunkhash-css-js1.png)

**问题**：js 引入 css 等其他文件时，js 文件变更，css 等文件名也会变更，缓存失效。

#### （3）contenthash

contenthash 表示由文件内容产生的 hash 值，内容不同产生的 contenthash 值也不一样。借助于 contenthash 可以解决上述问题，只要 css 文件不变，缓存一直有效。

修改 webpack 配置，css filename 使用 contenthash 表示。

```
const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.js",
    main: "./src/main.js",
    home: "./src/home.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(), // 清空dist目录
    new miniCssExtractPlugin({
      // 抽离css文件
      filename: "css/style.[contenthash].css"
    })
  ]
};

```

打包后，dist 目录下，生成了 css、js 文件，app 文件包含 chunkhash 值，css 文件包含 contenthash 值。

![contenthash](./image/contenthash.png);

修改 app.js 文件内容，重新打包，app 文件重命名了，css 文件没变，缓存有效。

![contenthash1](./image/contenthash1.png)

> **项目中 css 等非 js 文件抽离最好使用 contenthash。**

### 2.3.模式（mode）

## 3.webpack 实践
