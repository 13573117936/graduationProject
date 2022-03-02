import * as Router from 'koa-router'
import * as userService from '../services/user.service'
import { badParams } from '../stats'
import * as Joi from 'joi'
import { File } from 'formidable'

const router = new Router({
  prefix: '/api/user'
})

// 注册√
router.post('/register', async ctx => {
  const schema = Joi.object({
    username: Joi.string().length(11).pattern(/^[1]([3-9])[0-9]{9}$/).required(),
    password: Joi.string().min(6).required()
  })
  const { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  const result = await userService.register(value)
  ctx.body = {
    stat: 'OK',
    result: result
  }
})

// 登录√
router.post('/login', async ctx => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
  const { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  const tokens = await userService.login(value)
  ctx.set('Set-Cookie', `token=${tokens}; path=/; httpOnly`)
  ctx.body = {
    stat: 'OK',
    result: tokens
  }
})

// 获取当前用户信息√
router.post('/userInfo', async ctx => {
  const token = ctx.cookies.get('token')
  const userInfo = await userService.userInfo(token)
  if (userInfo) {
    ctx.body = {
      stat: 'OK',
      data: userInfo
    }
  } else {
    ctx.body = {
      stat: 'Not Login'
    }
  }
})

// id获取用户信息√
router.post('/getInfo', async ctx => {
  const schema = Joi.object({
    id: Joi.string().required()
  })
  const { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  const userInfo = await userService.getInfo(value.id)
  ctx.body = {
    stat: 'OK',
    data: userInfo
  }
})

// 编辑个人信息√
router.post('/edit', async ctx => {
  const token = ctx.cookies.get('token')
  const schema = Joi.object({
    nickname: Joi.string(),
    introduction: Joi.string()
  })
  const { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  const result = await userService.editInfo(token, value)
  ctx.body = {
    stat: 'OK',
    result
  }
})

// 修改密码√
router.post('/editPwd', async ctx => {
  const token = ctx.cookies.get('token')
  const schema = Joi.object({
    prePassword: Joi.string().required(),
    newPassword: Joi.string().required()
  })
  const { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  const result = await userService.editPwd(
    token,
    value.prePassword,
    value.newPassword
  )
  ctx.body = {
    stat: 'OK',
    result
  }
})

// 查看是否关注√
router.post('/follow/find', async ctx => {
  const token = ctx.cookies.get('token')
  const schema = Joi.object({
    userId: Joi.string()
  })
  const { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  const result = await userService.findFollow(value.userId, token)
  ctx.body = {
    stat: 'OK',
    result: result
  }
})

// 关注、取关 √
router.post('/follow', async ctx => {
  const token = ctx.cookies.get('token')
  const schema = Joi.object({
    state: Joi.boolean(),
    userId: Joi.string()
  })
  const { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  const result = await userService.follow(value.state, value.userId, token)
  ctx.body = {
    stat: 'OK'
  }
})

// 获取用户点赞动态√
router.post('/likes', async ctx => {
  const schema = Joi.object({
    id: Joi.string()
  })
  const { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  const rows = await userService.likes(value.id)
  ctx.body = {
    stat: 'OK',
    rows
  }
})

// 获取用户评论动态√
router.post('/comments', async ctx => {
  const schema = Joi.object({
    id: Joi.string()
  })
  const { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  const rows = await userService.comments(value.id)
  ctx.body = {
    stat: 'OK',
    rows
  }
})

// 获取用户关注列表√
router.post('/follows', async ctx => {
  const schema = Joi.object({
    id: Joi.string()
  })
  const { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  const rows = await userService.userFollows(value.id)
  ctx.body = {
    stat: 'OK',
    rows
  }
})

// 获取用户文章√
router.post('/articles', async ctx => {
  const schema = Joi.object({
    id: Joi.string()
  })
  const { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  const rows = await userService.articles(value.id)
  ctx.body = {
    stat: 'OK',
    rows
  }
})

// 头像上传
router.post('/upload', async ctx => {
  const token = ctx.cookies.get('token')
  const file = Object.values(ctx.request.files)[0] as File
  const key = await userService.upload(token, file.path, file.size, file.name)
  if (key) {
    ctx.body = {
      stat: 'OK',
      data: key
    }
  } else {
    ctx.body = {
      stat: 'ERROR'
    }
  }
})

export default router
