import * as Router from "koa-router";
import * as userService from "../services/user.service";
import { badParams } from "../stats";
import * as Joi from "joi";
import { File } from "formidable";

const router = new Router({
  prefix: "/api/user",
});

export default router;
