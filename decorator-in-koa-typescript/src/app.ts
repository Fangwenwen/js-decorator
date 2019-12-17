import KoaProject from './koaProject'

const startApp = async () => {
    const app = new KoaProject()
    app.start()
}

startApp()