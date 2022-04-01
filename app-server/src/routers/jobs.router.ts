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
    skip: Joi.number(),
    limit: Joi.number().required(),
  });
  const { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  const result = await jobsService.jobList(
    value.limit,
    value.value,
    value.skip
  );
  ctx.body = {
    stat: "OK",
    list: result,
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
    data: result,
  };
});

// 查看是否收藏 √
router.post("/favorite/find", async (ctx) => {
  const token = ctx.cookies.get("token");
  const schema = Joi.object({
    jobId: Joi.string(),
  });
  const { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  const result = await jobsService.findFavorite(value.articleId, token);
  ctx.body = {
    stat: "OK",
    result: result,
  };
});

// 收藏、取消 √
router.post("/favorite/handle", async (ctx) => {
  const token = ctx.cookies.get("token");
  const schema = Joi.object({
    state: Joi.boolean(),
    jobId: Joi.string(),
  });
  const { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  const result = await jobsService.doFavorite(value.state, value.jobId, token);
  ctx.body = {
    stat: "OK",
    result: result,
  };
});

export default router;
