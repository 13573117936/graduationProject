import axios from "axios";
import { IUser, ICompany, IJob } from "../types";

export interface BaseRes {
  stat: string;
  message: string;
}

export interface Result {
  data: ICompany;
  jobs: IJob[];
}

export interface numberResult {
  result: number;
}

export interface CompanyList {
  list: ICompany[];
}

// 职位列表
export async function companyList(
  limit: number,
  skip?: number,
  value?: string
) {
  const res = await axios.post<CompanyList>("/api/company/companyList", {
    limit,
    skip,
    value,
  });
  return res.data;
}

// 职位详情
export async function companyDetail(id: string) {
  const res = await axios.post<Result>("/api/company/detail", { id });
  return res.data;
}

// 职位数量
export async function number(id: string) {
  const res = await axios.post<numberResult>("/api/company/number", { id });
  return res.data;
}
