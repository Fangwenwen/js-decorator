import Koa from 'koa'
import Router from 'koa-router'

const router = new Router()

export enum requestMethod {
    'HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE'
}

enum _requestMethod {
    'head', 'options', 'get', 'put', 'patch', 'post', 'delete'
}

const routerMap: Map<{ target: any, name: string, method: number, path: string, middleware: any }, Function> = new Map()
export function RequestMapping(config: { method: number, path: string, middleware?: any[] }) {
    return (target: any, key: string, descriptor: Object) => {
        routerMap.set({
            target: target,
            name: key,
            method: config.method,
            path: config.path,
            middleware: config.middleware
        }, target[key])
    }
}

const defaultMiddleware: any[] = []

export function registerRouters(app: Koa) {
    for(let [config, controller] of routerMap) {
        let middleware = config.middleware == null ? [] : config.middleware
        middleware = defaultMiddleware.concat(middleware)
        router[_requestMethod[config.method]](config.path, ...middleware, controller)
    }
    app.use(router.routes())
}