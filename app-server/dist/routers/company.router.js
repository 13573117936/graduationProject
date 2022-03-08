"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const companyService = require("../services/company.service");
const Joi = require("joi");
const router = new Router({
    prefix: "/api/company",
});
router.post("/jobList", async (ctx) => {
    const schema = Joi.object({
        value: Joi.string(),
    });
    const { value, error } = schema.validate(ctx.request.body);
    const result = await companyService.companyList(value.value);
    ctx.body = {
        stat: "OK",
        result: result,
    };
});
exports.default = router;
//# sourceMappingURL=company.router.js.map