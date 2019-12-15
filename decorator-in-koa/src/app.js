import KoaProject from './koaProject'

const startApp = async () => {
    // 全局捕获未捕获的异常，守护node进程，防止node进程退出
    process.on('uncaughtException', (err) => {
        console.log(err)
    })

    // 创建 koa 实例并启动服务
    const app = new KoaProject()
    app.start()
}

startApp()