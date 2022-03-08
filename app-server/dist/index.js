"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const koaBody = require("koa-body");
const stats_1 = require("./stats");
const config_1 = require("./config");
const router_1 = require("./router");
const logger_1 = require("./middlewares/logger");
const db = require("./db");
const app = new Koa();
app.use(async (ctx, next) => {
    try {
        const start = Date.now();
        await next();
        const time = Date.now() - start;
        ctx.set("X-Response-Time", time + "ms");
    }
    catch (error) {
        if (error instanceof stats_1.ReqStat) {
            ctx.status = error.statusCode || 500;
            ctx.body = {
                stat: error.stat,
                message: error.msg,
            };
        }
        else {
            console.trace(error);
            ctx.status = 500;
            ctx.body = error.message;
        }
    }
});
app.use(logger_1.default);
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFieldsSize: config_1.default.uploadSizeLimit,
    },
}));
app.use(router_1.default.routes());
db.connect().then(() => app.listen(config_1.default.port, () => {
    console.log(`listening on http://0.0.0.0:${config_1.default.port}`);
}));
//# sourceMappingURL=index.js.map