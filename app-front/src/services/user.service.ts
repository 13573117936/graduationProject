import axios from "axios";
import { IUser } from "../types";

export interface BaseRes {
  stat: string;
  message: string;
}

export interface TokenResult extends BaseRes {
  token: string;
}

export interface StringResult extends BaseRes {
  result: string;
}

export interface UserInfo extends BaseRes {
  data: IUser;
}



// 注册
export async function register(
  username: string, // 账号
  password: string, // 密码
  role: string // 权限
) {
  const res = await axios.post<TokenResult>("/api/user/register", {
    username,
    password,
    role,
  });
  return res.data;
}

// 登录
export async function login(
  username: string, // 账号
  password: string, // 密码
  role: string // 权限
) {
  const result = await axios.post<TokenResult>("/api/user/login", {
    username,
    password,
    role,
  });
  return result.data;
}

// 获取用户信息
export async function userInfo() {
  const result = await axios.post<UserInfo>("/api/user/userInfo");
  return result.data;
}

// 头像上传
export async function userAvatar(file: File) {
  const data = new FormData()
  data.append('file', file)
  const result = await axios.post('/api/user/upload', data)
  return result.data
}