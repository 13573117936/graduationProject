import * as Router from "koa-router";
import * as companyService from "../services/company.service";
import { badParams } from "../stats";
import * as Joi from "joi";
import { File } from "formidable";

const router = new Router({
  prefix: "/api/company",
});

// 获取公司列表(搜索页、首页)
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

export default router;
