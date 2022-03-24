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
  const result = await companyService.companyList();
  ctx.body = {
    stat: "OK",
    result: result,
  };
});

// 职位详细页： 根据职位id，返回职位详细信息 √
router.post("/detail", async (ctx) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  const [result, jobs] = await companyService.getDetail(value.id);
  ctx.body = {
    stat: "OK",
    result,
    jobs,
  };
});

export default router;
