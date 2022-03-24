import * as Router from "koa-router";
import * as jobsService from "../services/jobs.service";
import { badParams } from "../stats";
import * as Joi from "joi";
import { File } from "formidable";

const router = new Router({
  prefix: "/api/jobs",
});

// 获取职位列表(搜索页、首页) √
router.post("/jobList", async (ctx) => {
  const schema = Joi.object({
    value: Joi.string(),
  });
  const { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  const result = await jobsService.jobList(value.value);
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
  const result = await jobsService.getDetail(value.id);
  ctx.body = {
    stat: "OK",
    result,
  };
});

export default router;
