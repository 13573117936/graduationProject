"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const companyService = require("../services/company.service");
const stats_1 = require("../stats");
const Joi = require("joi");
const router = new Router({
    prefix: "/api/company",
});
router.post("/companyList", async (ctx) => {
    const schema = Joi.object({
        value: Joi.string(),
        skip: Joi.number(),
        limit: Joi.number().required(),
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await companyService.companyList(value.limit, value.value, value.skip);
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
    const [result, jobs] = await companyService.getDetail(value.id);
    ctx.body = {
        stat: "OK",
        data: result,
        jobs: jobs,
    };
});
router.post("/number", async (ctx) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const number = await companyService.getNumber(value.id);
    ctx.body = {
        stat: "OK",
        result: number,
    };
});
exports.default = router;
//# sourceMappingURL=company.router.js.map