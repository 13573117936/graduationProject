"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const jobsService = require("../services/jobs.service");
const stats_1 = require("../stats");
const Joi = require("joi");
const router = new Router({
    prefix: "/api/jobs",
});
router.post("/jobList", async (ctx) => {
    const schema = Joi.object({
        value: Joi.string(),
        skip: Joi.number(),
        limit: Joi.number().required(),
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await jobsService.jobList(value.limit, value.value, value.skip);
    ctx.body = {
        stat: "OK",
        list: result,
    };
});
router.post("/detail", async (ctx) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await jobsService.getDetail(value.id);
    ctx.body = {
        stat: "OK",
        data: result,
    };
});
router.post("/favorite/find", async (ctx) => {
    const token = ctx.cookies.get("token");
    const schema = Joi.object({
        jobId: Joi.string(),
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await jobsService.findFavorite(value.articleId, token);
    ctx.body = {
        stat: "OK",
        result: result,
    };
});
router.post("/favorite/handle", async (ctx) => {
    const token = ctx.cookies.get("token");
    const schema = Joi.object({
        state: Joi.boolean(),
        jobId: Joi.string(),
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await jobsService.doFavorite(value.state, value.jobId, token);
    ctx.body = {
        stat: "OK",
        result: result,
    };
});
exports.default = router;
//# sourceMappingURL=jobs.router.js.map