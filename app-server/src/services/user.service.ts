import { Binary, ObjectId } from "mongodb";
import * as db from "../db";
import * as crypto from "crypto";
import { IUser } from "../types";
import { stats } from "../stats";
import * as fs from "fs";

export const tokens = new Map<string, ObjectId>();

// 注册
export async function register(record: IUser) {
  const user = await db.userCollection.findOne({
    username: record.username,
  });
  if (user) throw stats.ERR_EXISTS;
  const hash = crypto.createHash("sha1");
  hash.update(record.password);
  record.password = hash.digest("hex");
  const result = await db.userCollection.insertOne({
    username: record.username,
    password: record.password,
    nickname: "用户：" + record.username,
    avatar: "aa2c07be5a04caefdd148ddfcb0a652a",
    introduction: "无",
  
  });
  return result.insertedId;
}

// 登录
export async function login(record: IUser) {
  const user = await db.userCollection.findOne({
    username: record.username,
  });
  if (user === undefined) throw stats.ERR_USER_NOT_FOUND;
  const hash = crypto.createHash("sha1");
  hash.update(record.password);
  record.password = hash.digest("hex");
  if (user.password !== record.password) {
    throw stats.ERR_LOGIN_FAILED;
  }
  const token = crypto.randomBytes(12).toString("hex");
  tokens.set(token, user._id);
  return token;
}

// 获取当前用户信息
export async function userInfo(token: string) {
  const id = tokens.get(token);
  const user = await db.userCollection.findOne({
    _id: new ObjectId(id),
  });
  if (user === undefined) throw stats.ERR_NOT_LOGIN;
  return user;
}

// id获取用户信息
export async function getInfo(id: string) {
  const user = await db.userCollection.findOne({
    _id: new ObjectId(id),
  });
  if (user === undefined) throw stats.ERR_NOT_FOUND;
  return user;
}

// 编辑用户信息
export async function editInfo(token: string, record: IUser) {
  const id = tokens.get(token);
  const user = await db.userCollection.findOne({
    _id: new ObjectId(id),
  });
  if (user === undefined) throw stats.ERR_NOT_LOGIN;
  const res = await db.userCollection.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    {
      $set: record,
    }
  );
  return res;
}

// 修改密码
export async function editPwd(
  token: string,
  prePassword: string,
  newPassword: string
) {
  const id = tokens.get(token);
  const user = await db.userCollection.findOne({
    _id: new ObjectId(id),
  });
  if (user === undefined) throw stats.ERR_NOT_LOGIN;
  const hash = crypto.createHash("sha1");
  hash.update(prePassword);
  prePassword = hash.digest("hex");
  if (user.password !== prePassword) {
    throw stats.ERR_LOGIN_FAILED;
  }
  const hash2 = crypto.createHash("sha1");
  hash2.update(newPassword);
  newPassword = hash2.digest("hex");
  const res = await db.userCollection.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        password: newPassword,
      },
    }
  );
  return res;
}

// 查看是否关注
export async function findFollow(userId: string, token: string) {
  const id = tokens.get(token);
  const myuser = await db.userCollection.findOne({
    _id: new ObjectId(id),
  });
  if (myuser === undefined) throw stats.ERR_NOT_LOGIN;
  const res = await db.followCollection.findOne({
    fromUserId: new ObjectId(id),
    toUserId: new ObjectId(userId),
  });
  if (res === undefined) {
    return false;
  } else {
    return true;
  }
}

// 关注、取关
export async function follow(state: boolean, userId: string, token: string) {
  const id = tokens.get(token);
  const myuser = await db.userCollection.findOne({
    _id: new ObjectId(id),
  });
  if (myuser === undefined) throw stats.ERR_NOT_LOGIN;
  if (state === true) {
    await db.followCollection.findOneAndDelete({
      fromUserId: new ObjectId(id),
      toUserId: new ObjectId(userId),
    });
    return "已取消关注";
  } else {
    await db.followCollection.insertOne({
      fromUserId: new ObjectId(id),
      toUserId: new ObjectId(userId),
    });
    return "已关注";
  }
}

// 获取点赞信息
export async function likes(id: string) {
  const rows = db.likeCollection.aggregate([
    {
      $match: { userId: new ObjectId(id) },
    },
    {
      $lookup: {
        from: "user",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "article",
        localField: "articleId",
        foreignField: "_id",
        as: "article",
      },
    },
  ]);
  return rows.toArray();
}

// 获取评论信息
export async function comments(id: string) {
  const rows = db.commentCollection.find({
    userId: new ObjectId(id),
  });
  return rows.toArray();
}

// 获取关注列表
export async function userFollows(id: string) {
  const rows = db.followCollection.find({
    fromUserId: new ObjectId(id),
  });
  return rows.toArray();
}

// 获取用户文章
export async function articles(id?: string) {
  if (id) {
    const rows = db.articleCollection
      .aggregate([
        {
          $match: { author: new ObjectId(id) },
        },
        {
          $lookup: {
            from: "user",
            localField: "author",
            foreignField: "_id",
            as: "user",
          },
        },
      ])
      .toArray();
    return rows;
  } else {
    const rows = db.articleCollection
      .aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: "user",
            localField: "author",
            foreignField: "_id",
            as: "user",
          },
        },
      ])
      .toArray();
    return rows;
  }
}

// avatar上传
export async function upload(
  token: string,
  path: string,
  size: number,
  name: string
) {
  const _id = tokens.get(token);
  const key = crypto.randomBytes(16).toString("hex");
  const data = await fs.promises.readFile(path);
  await db.fileCollection.insertOne({
    key: key,
    data: new Binary(data),
    size: size,
    name: name,
  });
  await db.userCollection.findOneAndUpdate(
    {
      _id: new ObjectId(_id),
    },
    {
      $set: {
        avatar: key,
      },
    }
  );
  await fs.promises.unlink(path);
  return key;
}
