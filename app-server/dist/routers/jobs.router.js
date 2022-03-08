"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const jobsService = require("../services/jobs.service");
const Joi = require("joi");
const router = new Router({
    prefix: "/api/jobs",
});
router.post("/jobList", async (ctx) => {
    const schema = Joi.object({
        value: Joi.string(),
    });
    const { value, error } = schema.validate(ctx.request.body);
    const result = await jobsService.jobList(value.value);
    ctx.body = {
        stat: "OK",
        result: result,
    };
});
exports.default = router;
//# sourceMappingURL=jobs.router.js.map