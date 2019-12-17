import Koa from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static'
import path from 'path'
import { registerRouters } from './controller/requestMapping'

const CONFIG = require('./config.json')

export * from './controller/index'

export default class Project {
    public app: Koa

    constructor() {
        this.app = new Koa()
    }

    private _setApp() {
        this.app.use(KoaBody({
            jsonLimit: '100mb',
            formLimit: '100mb',
            multipart: true
        }))

        this.app.use(KoaStatic(path.join(__dirname, './webroot')))
    }

    private _setRouters() {
        registerRouters(this.app)
    }

    public start() {
        this._setApp()
        this._setRouters()
        this.app.listen(CONFIG.SERVER_CONFIG.PORT, () => {
            console.log('success')
        })
    }
}