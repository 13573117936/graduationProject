import { Binary, ObjectId } from "mongodb";
import * as db from "../db";
import * as crypto from "crypto";
import { IUser } from "../types";
import { stats } from "../stats";
import * as fs from "fs";

// 公司列表
export async function companyList() {
  const result = await db.companyCollection.find().limit(9).toArray();
  return result;
}

// 根据职位id查询职位信息
export async function getDetail(_id: string) {
  const result = await db.companyCollection.findOne({
    _id: new ObjectId(_id),
  });
  if (!result) throw stats.ERR_NOT_FOUND;
  const jobs = await db.jobCollection
    .find({
      companyId: new ObjectId(_id),
    })
    .limit(6)
    .toArray();
  return [result, jobs];
}
