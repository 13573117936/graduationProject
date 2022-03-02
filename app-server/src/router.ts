import * as Router from 'koa-router'

import userRouter from './routers/user.router'

const router = new Router()
router.use(userRouter.routes())

export default router
