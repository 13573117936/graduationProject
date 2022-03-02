"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const articleService = require("../services/article.service");
const stats_1 = require("../stats");
const Joi = require("joi");
const router = new Router({
    prefix: '/api/article'
});
router.post('/like/find', async (ctx) => {
    const token = ctx.cookies.get('token');
    const schema = Joi.object({
        articleId: Joi.string()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await articleService.findLike(value.articleId, token);
    ctx.body = {
        stat: 'OK',
        result
    };
});
router.post('/like', async (ctx) => {
    const token = ctx.cookies.get('token');
    const schema = Joi.object({
        state: Joi.boolean(),
        articleId: Joi.string(),
        articleName: Joi.string()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await articleService.like(value.state, value.articleId, value.articleName, token);
    ctx.body = {
        stat: 'OK'
    };
});
router.post('/comment', async (ctx) => {
    const token = ctx.cookies.get('token');
    const schema = Joi.object({
        articleId: Joi.string(),
        content: Joi.string()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await articleService.comment(value.articleId, token, value.content);
    ctx.body = {
        stat: 'OK',
        result
    };
});
router.post('/view', async (ctx) => {
    const schema = Joi.object({
        articleId: Joi.string()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await articleService.view(value.articleId);
    ctx.body = {
        stat: 'OK'
    };
});
router.post('/removeComment', async (ctx) => {
    const schema = Joi.object({
        id: Joi.string()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await articleService.removeComment(value.id);
    ctx.body = {
        stat: 'OK'
    };
});
router.post('/post', async (ctx) => {
    const token = ctx.cookies.get('token');
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        label: Joi.required(),
        banner: Joi.array()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await articleService.post(value, token);
    ctx.body = {
        stat: 'OK',
        result
    };
});
router.post('/edit', async (ctx) => {
    const token = ctx.cookies.get('token');
    const schema = Joi.object({
        _id: Joi.string().required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
        label: Joi.required(),
        banner: Joi.array()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await articleService.edit(value._id, value, token);
    ctx.body = {
        stat: 'OK',
        result
    };
});
router.post('/remove', async (ctx) => {
    const token = ctx.cookies.get('token');
    const schema = Joi.object({
        id: Joi.string().required()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await articleService.remove(value.id, token);
    ctx.body = {
        stat: 'OK'
    };
});
router.post('/detail', async (ctx) => {
    const schema = Joi.object({
        id: Joi.string().required()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await articleService.detail(value.id);
    if (result) {
        ctx.body = {
            stat: 'OK',
            data: result
        };
    }
    else {
        ctx.body = {
            stat: 'Not Found'
        };
    }
});
router.post('/search', async (ctx) => {
    const schema = Joi.object({
        str: Joi.string().required()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await articleService.search(value.str);
    ctx.body = {
        stat: 'OK',
        rows: result
    };
});
router.post('/comments', async (ctx) => {
    const schema = Joi.object({
        articleId: Joi.string().required()
    });
    const { value, error } = schema.validate(ctx.request.body);
    if (error)
        throw stats_1.badParams(error.message);
    const result = await articleService.comments(value.articleId);
    ctx.body = {
        stat: 'OK',
        rows: result
    };
});
router.post('/upload', async (ctx) => {
    const file = Object.values(ctx.request.files)[0];
    const key = await articleService.upload(file.path, file.size, file.name);
    ctx.body = {
        stat: 'OK',
        data: key
    };
});
router.get('/download/:key', async (ctx) => {
    const key = ctx.params.key;
    const file = await articleService.download(key);
    ctx.set('Content-Type', 'application/octet-stream');
    ctx.res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(file.name));
    ctx.body = file.data.buffer;
});
exports.default = router;
//# sourceMappingURL=article.router.js.map