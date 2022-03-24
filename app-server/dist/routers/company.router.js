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
    const result = await companyService.companyList();
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
    const [result, jobs] = await companyService.getDetail(value.id);
    ctx.body = {
        stat: "OK",
        result,
        jobs,
    };
});
exports.default = router;
//# sourceMappingURL=company.router.js.map