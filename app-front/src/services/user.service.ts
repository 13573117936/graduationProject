import axios from "axios";
import { IUser } from "../types";

export interface BaseRes {
  stat: string;
  message: string;
}

export interface Result {
  result: string;
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
export async function login(username: string, password: string) {
  const res = await axios.post<Result>("/api/user/login", {
    username,
    password,
  });
  return res.data;
}
