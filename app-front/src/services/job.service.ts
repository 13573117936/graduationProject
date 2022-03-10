import axios from "axios";
import { IUser, IJob } from "../types";

export interface BaseRes {
  stat: string;
  message: string;
}

export interface Result {
  result: string;
}

export interface JobList {
  result: IJob[];
}

// 职位列表
export async function jobList(limit?: number) {
  const res = await axios.post<JobList>("/api/jobs/jobList", { limit });
  return res.data;
}
