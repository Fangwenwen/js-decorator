import { RequestMapping, requestMethod } from './requestMapping'
import { filterLogin } from './middleware/initAuth'

export class IndexController {
    // 添加首页路由
    @RequestMapping({
        method: requestMethod.GET,
        path: '/'
    })
    static async indexRoute(ctx) {
        ctx.response.body = 'index page'
    }

    // 添加用户页路由
    @RequestMapping({
        method: requestMethod.GET,
        path: '/user',
        middleware: [filterLogin]
    })
    static async userRoute(ctx) {
        ctx.response.body = 'user page'
    }
}