import axios from "axios";
import { IUser, ICompany } from "../types";

export interface BaseRes {
  stat: string;
  message: string;
}

export interface Result {
  result: string;
}

export interface CompanyList {
  result: ICompany[];
}

// 职位列表
export async function companyList(limit?: number) {
  const res = await axios.post<CompanyList>("/api/company/companyList", {
    limit,
  });
  return res.data;
}
