"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs = require("dayjs");
const crypto = require("crypto");
async function default_1(ctx, next) {
    const start = Date.now();
    await next();
    const requestId = crypto.randomBytes(6).toString("hex");
    ctx.set("X-Request-Id", requestId);
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const info = {
        time,
        method: ctx.method,
        url: ctx.url,
        requestId,
        ip: ctx.request.ip,
        response: Date.now() - start,
        status: ctx.status,
    };
    console.log(JSON.stringify(info));
}
exports.default = default_1;
//# sourceMappingURL=logger.js.map