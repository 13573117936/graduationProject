"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const userService = require("../services/user.service");
const stats_1 = require("../stats");
const Joi = require("joi");
const router = new Router({
    prefix: '/api/user'
});
router.post('/register', async (ctx) => {
    const schema = Joi.object({
        username: Joi.string().length(11).pattern(/^[1]([3-9])[0-9]{9}$/).required(),
        password: Joi.string().min(6).required()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await userService.register(value);
    ctx.body = {
        stat: 'OK',
        result: result
    };
});
router.post('/login', async (ctx) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const tokens = await userService.login(value);
    ctx.set('Set-Cookie', `token=${tokens}; path=/; httpOnly`);
    ctx.body = {
        stat: 'OK',
        result: tokens
    };
});
router.post('/userInfo', async (ctx) => {
    const token = ctx.cookies.get('token');
    const userInfo = await userService.userInfo(token);
    if (userInfo) {
        ctx.body = {
            stat: 'OK',
            data: userInfo
        };
    }
    else {
        ctx.body = {
            stat: 'Not Login'
        };
    }
});
router.post('/getInfo', async (ctx) => {
    const schema = Joi.object({
        id: Joi.string().required()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const userInfo = await userService.getInfo(value.id);
    ctx.body = {
        stat: 'OK',
        data: userInfo
    };
});
router.post('/edit', async (ctx) => {
    const token = ctx.cookies.get('token');
    const schema = Joi.object({
        nickname: Joi.string(),
        introduction: Joi.string()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await userService.editInfo(token, value);
    ctx.body = {
        stat: 'OK',
        result
    };
});
router.post('/editPwd', async (ctx) => {
    const token = ctx.cookies.get('token');
    const schema = Joi.object({
        prePassword: Joi.string().required(),
        newPassword: Joi.string().required()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await userService.editPwd(token, value.prePassword, value.newPassword);
    ctx.body = {
        stat: 'OK',
        result
    };
});
router.post('/follow/find', async (ctx) => {
    const token = ctx.cookies.get('token');
    const schema = Joi.object({
        userId: Joi.string()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await userService.findFollow(value.userId, token);
    ctx.body = {
        stat: 'OK',
        result: result
    };
});
router.post('/follow', async (ctx) => {
    const token = ctx.cookies.get('token');
    const schema = Joi.object({
        state: Joi.boolean(),
        userId: Joi.string()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await userService.follow(value.state, value.userId, token);
    ctx.body = {
        stat: 'OK'
    };
});
router.post('/likes', async (ctx) => {
    const schema = Joi.object({
        id: Joi.string()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const rows = await userService.likes(value.id);
    ctx.body = {
        stat: 'OK',
        rows
    };
});
router.post('/comments', async (ctx) => {
    const schema = Joi.object({
        id: Joi.string()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const rows = await userService.comments(value.id);
    ctx.body = {
        stat: 'OK',
        rows
    };
});
router.post('/follows', async (ctx) => {
    const schema = Joi.object({
        id: Joi.string()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const rows = await userService.userFollows(value.id);
    ctx.body = {
        stat: 'OK',
        rows
    };
});
router.post('/articles', async (ctx) => {
    const schema = Joi.object({
        id: Joi.string()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const rows = await userService.articles(value.id);
    ctx.body = {
        stat: 'OK',
        rows
    };
});
router.post('/upload', async (ctx) => {
    const token = ctx.cookies.get('token');
    const file = Object.values(ctx.request.files)[0];
    const key = await userService.upload(token, file.path, file.size, file.name);
    if (key) {
        ctx.body = {
            stat: 'OK',
            data: key
        };
    }
    else {
        ctx.body = {
            stat: 'ERROR'
        };
    }
});
exports.default = router;
//# sourceMappingURL=user.router.js.map