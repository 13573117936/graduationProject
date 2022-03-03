import axios from "axios";
import { IUser } from "../types";

export interface BaseRes {
  stat: string;
  message: string;
}

export interface Result {
  result: string;
}

interface UserInfo extends BaseRes {
  data: IUser;
}

// 注册
export async function register(username: string, password: string) {
  const res = await axios.post<Result>("/api/user/register", {
    username,
    password,
  });
  return res.data;
}

// 登录
export async function login(username: string, password: string, role: string) {
  const res = await axios.post<Result>("/api/user/login", {
    username,
    password,
    role,
  });
  return res.data;
}

// 获取用户信息
export async function userInfo() {
  const result = await axios.post<UserInfo>("/api/user/front/getInfo");
  return result.data;
}
