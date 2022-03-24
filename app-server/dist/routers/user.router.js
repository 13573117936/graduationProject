"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const userService = require("../services/user.service");
const stats_1 = require("../stats");
const Joi = require("joi");
const router = new Router({
    prefix: "/api/user",
});
router.post("/register", async (ctx) => {
    const schema = Joi.object({
        username: Joi.string().length(11).required(),
        password: Joi.string().min(6).max(16).required(),
        role: Joi.string().required(),
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const tokens = await userService.register(value);
    ctx.set("Set-Cookie", `token=${tokens}; path=/; httpOnly; Max-age=604800`);
    ctx.body = {
        stat: 'OK',
        tokens,
    };
});
router.post("/login", async (ctx) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const tokens = await userService.login(value);
    ctx.set("Set-Cookie", `token=${tokens}; path=/; httpOnly`);
    ctx.body = {
        stat: "OK",
        tokens,
    };
});
router.post("/userInfo", async (ctx) => {
    const token = ctx.cookies.get("token");
    const userInfo = await userService.userInfo(token);
    ctx.body = {
        stat: "OK",
        data: userInfo,
    };
});
router.post("/detail", async (ctx) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await userService.getDetail(value.id);
    ctx.body = {
        stat: "OK",
        data: result,
    };
});
exports.default = router;
//# sourceMappingURL=user.router.js.map