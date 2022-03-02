"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const user_router_1 = require("./routers/user.router");
const router = new Router();
router.use(user_router_1.default.routes());
exports.default = router;
//# sourceMappingURL=router.js.map