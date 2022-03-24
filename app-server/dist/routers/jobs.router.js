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
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await jobsService.jobList(value.value);
    ctx.body = {
        stat: "OK",
        result: result,
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
        result,
    };
});
exports.default = router;
//# sourceMappingURL=jobs.router.js.map