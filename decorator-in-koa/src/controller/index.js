import { requestMethod, RequestMapping } from './RequestMapping'
import { filterLogin } from './middleware/initAuth'

export class IndexController {
    @RequestMapping({
        method: requestMethod.GET,
        path: '/'
    })
    static async indexRoute(ctx) {
        ctx.body = 'index page'
    }

    @RequestMapping({
        method: requestMethod.GET,
        path: '/user',
        middleware: [ filterLogin ]
    })
    static async userRoute(ctx) {
        ctx.body = 'user page'
    }
}