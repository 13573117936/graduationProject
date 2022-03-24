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
    avatar: "",
    email: "",
    name: "用户" + record.username,
    sex: 1,
    companyId: "",
    role: 2,
  });
  const token = crypto.randomBytes(12).toString("hex");
  tokens.set(token, result.insertedId);
  return token;
}

// 登录
export async function login(record: IUser) {
  const user = await db.userCollection.findOne({
    username: record.username,
  });
  if (!user) throw stats.ERR_USER_NOT_FOUND;
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

// 当前登录用户信息
export async function userInfo(token: string) {
  const _id = tokens.get(token);
  const user = await db.userCollection.findOne(
    {
      _id: new ObjectId(_id),
    },
    {
      projection: {
        password: 0,
        isDisabled: 0,
      },
    }
  );
  if (!user) throw stats.ERR_NOT_LOGIN;
  return user;
}

// 根据id获取用户信息
export async function getDetail(_id: string) {
  const user = await db.userCollection.findOne({
    _id: new ObjectId(_id),
  });
  if (!user) throw stats.ERR_NOT_FOUND;
  return user;
}
