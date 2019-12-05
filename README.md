### javascript中的装饰器及其在koa中的应用

最近在公司做的一个项目后台用的是koa，之前写koa的路由是这样的：

```javascript
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/', async(ctx, next) => {
    // 代码
})

app.use(router.routes())
   .use(router.allowedMethods())
```

或者这样的：

```javascript
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

// 子路由1
const home = new Router()
home.get('/', async(ctx, next) => { // 其他中间件
    // 代码
    await next()
}, async(ctx) => {
    // 代码
})

// 子路由2
const page = new Router()
page.get('/helloworld', async(ctx) => {
    // 代码
}).get('/404', async(ctx) => {
    // 代码
})

// 装载所有子路由
const router = new Router()
router.use('/', home.routes())
router.use('/page', page.routes())

// 加载路由中间件
app.use(router.routes())
   .use(router.allowedMethods())
```

然而这次是这样的：

```javascript
// ./src/controller/index.js
export class IndexController {
    @RequestMapping({
        method: RequestMethod.GET,
        path: '/',
        middleware: [filterLogin]
    })
    static async addIndexRoute(ctx) {
        // 代码
    }

    @RequestMapping({
        method: RequestMethod.GET,
        path: '/user',
        middleware: [filterLogin]
    })
    static async addUserRoute(ctx) {
        // 代码
    }

    // ...
}

// ./src/controller/RequestMapping.js
const Router = require('koa-router')
const router = new Router()
const map = new Map()
function RequestMapping(config) {
    return (target, key, descriptor) => {
        map.set({
            method: config.method,
            path: config.path,
            middleware: config.middleware
        }, target[key])
    }
}

function registerRouters(app) {
    for(let [config, controller] of map) {
        router[config.method](config.path, ...config.middleware, controller)
    }
    app.use(router.routes())
}
```

第一次接触这种代码的时候，我也是一脸懵，`@RequestMapping`是啥？`RequestMapping`函数做了啥？`registerRouters`函数如何实现路由注册？  
但是经过我的不懈努力，终于搞清楚这段代码是怎么回事，于是就有了下面关于javascript装饰器的介绍（chao xi）：

#### javascript里的装饰器主要用于：

1. 装饰类
2. 装饰方法或属性

**装饰类**

```javascript
@decorator
class Dog {
}
```

**装饰方法或属性**

```javascript
class Dog {
    @decorator
    bark() {
    }
}
```

看到这里，大家是不是恍然大悟，原来`@RequestMapping`就是js的装饰器呐。那么装饰器到底是干嘛的呢，看了很多解释，我觉得最通俗易懂的是：当我们需要给类或方法扩展一些新的行为，但是又不修改类或方法本身时，就可以用装饰器来扩展该类或方法的新行为  
下面就看看它的具体表现和运行原理吧

#### 作用于类的装饰器

```javascript
function isAnimal(target) {
    target.isAnimal = true
    return target
}

@isAnimal
class Dog {
}

console.log(Dog.isAnimal) // true
```

那么这段代码到底发生了什么，居然会有如此神奇的效果。其实啊，js装饰器的实现依赖于Object.defineProperty方法  
作用于类上的decorator，它接收的第一个参数target是类本身，经过babel编译：

```javascript
let _class

let Dog = isAnimal(_class = class Dog {}) || _class

function isAnimal(target) {
    target.isAnimal = true
    return target
}
```

所以其原理就是：

```javascript
@isAnimal
class Dog {}

// 等同于

class Dog {}
Dog = isAnimal(Dog) || Dog
```

#### 作用于类方法的装饰器

有的时候，我们希望把部分方法或属性设置成只读的，以避免别人对其修改，借用装饰器实现：

```javascript
function readOnly(target, key, descriptor) {
    descriptor.writable = false
    return descriptor
}

class Dog {
    @readOnly
    bark() {
        console.log('wang wang~')
    }
}

const dog = new Dog()
dog.bark = function() {
    console.log('miao~')
}

console.log(dog.bark()) // 'wang wang~'
```

`@readOnly`具体做了什么？我们先来看下ES6的class转换成ES5后的代码是什么样的：

```javascript
// 步骤1
function Dog() {}

// 步骤2
Object.defineProperty(Dog.prototype, 'bark', {
    value: function() { console.log('wang wang~') }
    enumerable: false, // 不可枚举
    configurable: true,
    writable: true
})
```

对`bark`方法应用`@readOnly`之后，js引擎就会在步骤2之前调用这个decorator：

```javascript
let descriptor = {
    value: function() { console.log('wang wang~') }
    enumerable: false,
    configurable: true,
    writable: true
}

descriptor = readOnly(Dog.prototype, 'bark', descriptor) || descriptor
Object.defineProperty(Dog.prototype, 'bark', descriptor)
```

所以，总结一下就是：

1. 装饰器作用于类，其实是改变类本身（即target等于类本身），最后返回该类（即target，不返回也行）
2. 装饰器作用于类方法，其实是改变该方法的描述符descriptor（target等于类.prototype，描述符里记录着这个属性的全部信息），最后返回描述符descriptor（不返回也行）

#### 如何在现在的环境中使用装饰器

需要使用`Babel`进行转码，需要用到`@babel/plugin-proposal-decorators`这个插件，对应的`.babelrc`配置为：

```javascript
{
    "plugins": [
        ["@babel/plugin-proposal-decorators", {"legacy": true}],
        ["@babel/plugin-proposal-class-properties", {"loose": true}]
    ]
}
```

#### 补充

#### 1.descriptor也可以是factory function

如果我们想对不同的目标对象应用同一个descriptor，但同时需要有一些差别，怎么办？很简单：

```javascript
function isAnimal(val) {
    return function(target) {
        target.isAnimal = val
        return target
    }
}

function readOnly(val) {
    return funtion(target, key, descriptor) {
        descriptor.writable = val
        return descriptor
    }
}

@isAnimal(true)
class Dog {
    @readOnly(false)
    bark() {
        console.log('wang wang~')
    }
}

console.log(Dog.isAnimal) // true

@isAnimal(false)
class Person {
    say() {
    }
}
console.log(Person.isAnimal) // false
```

#### 2.[core-decorators](https://github.com/jayphelps/core-decorators)，提供了一些非常实用的decorator

#### 最后

我相信弄懂了装饰器，那段注册koa路由的代码也就弄懂了

#### 参考

1.[Javascript 中的装饰器](https://aotu.io/notes/2016/10/24/decorator/index.html)  
2.[Decorators in ES7](https://zhuanlan.zhihu.com/p/20139834)

#### 代码
