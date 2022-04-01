import * as Router from "koa-router";
import * as companyService from "../services/company.service";
import { badParams } from "../stats";
import * as Joi from "joi";
import { File } from "formidable";

const router = new Router({
  prefix: "/api/company",
});

// 获取公司列表(搜索页、首页) √
router.post("/companyList", async (ctx) => {
  const schema = Joi.object({
    value: Joi.string(),
    skip: Joi.number(),
    limit: Joi.number().required(),
  });
  const { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  const result = await companyService.companyList(
    value.limit,
    value.value,
    value.skip
  );
  ctx.body = {
    stat: "OK",
    list: result,
  };
});

// 公司详情页 √
router.post("/detail", async (ctx) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  const [result, jobs] = await companyService.getDetail(value.id);
  ctx.body = {
    stat: "OK",
    data: result,
    jobs: jobs,
  };
});

// 职位数量
router.post("/number", async (ctx) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  const number = await companyService.getNumber(value.id);
  ctx.body = {
    stat: "OK",
    result: number,
  };
});

export default router;
