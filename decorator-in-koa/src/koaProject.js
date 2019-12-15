import Koa from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static'
import path from 'path'
import { registerRouters } from './controller/RequestMapping' 
import CONFIG from './config.json'

export * from './controller/index'

export default class Project {
    app

    constructor() {
        this.app = new Koa()
    }

    _setApp() {
        // 支持 json 解析，支持 multipart 数据附件类型等
        this.app.use(KoaBody({
            jsonLimit: '100mb',
            formLimit: '100mb',
            multipart: true
        }))

        // 设置静态目录
        this.app.use(KoaStatic(path.join(__dirname, './webroot')))
    }

    _setRouters() {
        registerRouters(this.app)
    }

    async start() {
        this._setApp()
        this._setRouters()
        this.app.listen(CONFIG.SERVER_CONFIG.PORT, () => {
            console.log('success')
        })
    }
}