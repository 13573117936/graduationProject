import * as Router from "koa-router";
import * as userService from "../services/user.service";
import { badParams } from "../stats";
import * as Joi from "joi";
import { File } from "formidable";

const router = new Router({
  prefix: "/api/user",
});

// 注册(注册成功即登录) √
router.post("/register", async (ctx) => {
  const schema = Joi.object({
    username: Joi.string().length(11).required(),
    password: Joi.string().min(6).max(16).required(),
    role: Joi.string().required(),
  });
  const { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  const tokens = await userService.register(value);
  /* const tokens = await userService.login(value); */
  ctx.set("Set-Cookie", `token=${tokens}; path=/; httpOnly; Max-age=604800`);
  ctx.body = {
    stat: 'OK',
    tokens,
  };
});

// 登录 √
router.post("/login", async (ctx) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  });
  const { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  const tokens = await userService.login(value);
  ctx.set("Set-Cookie", `token=${tokens}; path=/; httpOnly`);
  ctx.body = {
    stat: "OK",
    tokens,
  };
});

// 获取当前登录用户信息 √
router.post("/userInfo", async (ctx) => {
  const token = ctx.cookies.get("token");
  const userInfo = await userService.userInfo(token);
  ctx.body = {
    stat: "OK",
    data: userInfo,
  };
});

// 根据id获取用户信息 √
router.post("/detail", async (ctx) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  const result = await userService.getDetail(value.id);
  ctx.body = {
    stat: "OK",
    data: result,
  };
});

export default router;
