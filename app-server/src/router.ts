import * as Router from "koa-router";

import userRouter from "./routers/user.router";
import jobsRouter from "./routers/jobs.router";
import companyRouter from "./routers/company.router";
const router = new Router();
router.use(userRouter.routes());
router.use(jobsRouter.routes());
router.use(companyRouter.routes());
export default router;
