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
    stat: "OK",
    token: tokens,
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
  ctx.set("Set-Cookie", `token=${tokens}; path=/; httpOnly; Max-age=604800`);
  ctx.body = {
    stat: "OK",
    token: tokens,
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

// 图片上传
router.post("/upload", async (ctx) => {
  const token = ctx.cookies.get("token");
  const file = Object.values(ctx.request.files)[0] as File;
  const key = await userService.upload(token, file.path, file.size, file.name);
  ctx.body = {
    stat: "OK",
    result: key,
  };
});

/**
 * 根据key下载文件
 */
router.get("/download/:key", async (ctx) => {
  const key = ctx.params.key;
  const file = await userService.download(key);
  ctx.set("Content-Type", "application/octet-stream");
  ctx.res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + encodeURIComponent(file.name)
  );
  ctx.body = file.data.buffer;
});

export default router;
