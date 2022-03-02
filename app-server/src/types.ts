import { Binary, ObjectId } from 'mongodb'

/**
 * 用户表
 */
export interface IUser {
  /**
   * 用户名
   */
  username: string
  /**
   * 密码
   */
  password: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 头像
   */
  avatar: string
  /**
   * 个人简介
   */
  introduction: string
  
}



/**
 * 文章表
 */
export interface IArticle {
  /**
   * 文章标题
   */
  title: string
  /**
   * 内容
   */
  content: string
  /**
   * banner图(可选)
   */
  banner?: string[]
  /**
   * 发布时间
   */
  time: Date
  /**
   * 发布人ID
   */
  author: ObjectId
  /**
   * 标签
   */
  label: string[]
  /**
   * 浏览量
   */
  views: number
  /**
   * 点赞量
   */
  likes: number
}

/**
 * 点赞表
 */
export interface ILike {
  /**
   * 用户ID
   */
  userId: ObjectId
  /**
   * 点赞时间
   */
  time: Date
  /**
   * 文章ID
   */
  articleId: ObjectId
  /**
   * 文章标题
   */
  title: string
}

/**
 * 关注表
 */
export interface IFollow {
  /**
   * 关注者ID
   */
  fromUserId: ObjectId
  /**
   * 被关注者ID
   */
  toUserId: ObjectId
}

/**
 * 评论表
 */
export interface IComment {
  /**
   * 评论人ID
   */
  userId: ObjectId
  /**
   * 文章ID
   */
  articleId: ObjectId
  /**
   * 发布时间
   */
  time: Date
  /**
   * 评论内容
   */
  content: string
}

/**
 * 图片表
 */
export interface IFile {
  key: string
  /**
   * 文件二进制数据
   */
  data: Binary
  /**
   * 文件名
   */
  name: string
  /**
   * 文件大小
   */
  size: number
}
