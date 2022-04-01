import axios from "axios";
import { IUser, IJob } from "../types";

export interface BaseRes {
  stat: string;
  message: string;
}

export interface Result {
  data: IJob;
}

export interface booleanResult {
  result: boolean;
}

export interface stringResult {
  result: string;
}

export interface JobList {
  list: IJob[];
}

// 职位列表
export async function jobList(limit: number, skip?: number, value?: string) {
  const res = await axios.post<JobList>("/api/jobs/jobList", {
    limit,
    skip,
    value,
  });
  return res.data;
}

// 职位详情
export async function jobDetail(id: string) {
  const res = await axios.post<Result>("/api/jobs/detail", { id });
  return res.data;
}

// 请求高德地图
export async function location(key: string, arrdess: string) {
  const result = await axios.post(
    "https://restapi.amap.com/v3/geocode/geo?address=" + arrdess + "&key=" + key
  );
  return result;
}

// 查看是否收藏
export async function findFavorite(jobId: string) {
  const res = await axios.post<booleanResult>("/api/jobs/favorite/find", {
    jobId,
  });
  return res.data;
}

// 收藏、取消
export async function doFavorite(state: boolean, jobId: string) {
  const res = await axios.post<booleanResult>("/api/jobs/favorite/handle", {
    state,
    jobId,
  });
  return res.data;
}
