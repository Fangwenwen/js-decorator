### 在nodejs中使用import和装饰器（babel7环境）

前言：在`decorator-demo`项目中，我们都是先将代码通过`babel`进行一次编译，然后运行编译之后的代码，那么如果想直接运行源代码呢？  
这个项目就是直接运行源代码的，这里说一下该项目中`babel`的配置。在项目的根目录下，如果直接`node index.js`，就会报关于`import`的错，想要在nodejs中使用`import`，就需要用到`babel`，这里给出两种实现方式：

1. 使用`@babel/register`
2. 使用`@babel/node`

这两种方式都要先安装`@babel/cli`和`@babel/core`（必须）  
`@babel/cli`是命令行工具，用于在命令行执行`babel`；`@babel/core`是`babel`用于解析、转换、代码生成的核心包，安装如下：

```javascript
npm install @babel/cli @babel/core --save-dev
```

#### 使用`@babel/register`

先在项目下安装`babel/register`

```javascript
npm install babel/register --save-dev
```

然后在入口文件中require：（这里我的入口文件是项目根目录下的index.js）

```javascript
require('@babel/register')
require('./src/app.js')
```

当然，有了这些还不够，我们还需要安装可以转换js新特性的`@babel/preset-env`和支持`class`、装饰器的插件:

```javascript
npm install @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators --save-dev
```

此时你还需要在根目录下创建`.babelrc`文件，并配置如下：

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "target": {
                    "node": "current"
                }
            }
        ]
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", {"legacy": true}],
        ["@babel/plugin-proposal-class-properties", {"loose": true}]
    ]
}
```

然后在命令行执行：

```javascript
node index.js
```

需要注意的是：我们需要新增一个入口文件（即根目录下的index.js），并在该文件中`require('@babel/register')`

#### 使用`@babel/node`

先安装`@babel/node`

```javascript
npm install @babel/node --save-dev
```

同样依赖于刚刚创建的`.babelrc`

在命令行下执行：（注意要加npx，当然也可以配置在package.json的scripts中，那样就不用加npx）

```javascript
npx babel-node ./src/app.js
```

大功告成，项目就运行起来了。
