import { Binary, ObjectId } from "mongodb";
import * as db from "../db";
import * as crypto from "crypto";
import { IUser } from "../types";
import { stats } from "../stats";
import * as fs from "fs";

// 公司列表
/* export async function companyList() {
  const result = await db.companyCollection.find().limit(9).toArray();
  return result;
} */
export async function companyList(
  limit: number,
  value: string = "",
  skip: number = 0
) {
  const result = await db.companyCollection
    .aggregate([
      {
        $match: { companyFullName: { $regex: value, $options: "i" } },
      },
    ])
    .skip(skip)
    .limit(limit)
    .toArray();
  return result;
}

// 公司详情
export async function getDetail(_id: string) {
  const result = await db.companyCollection.findOne({
    _id: new ObjectId(_id),
  });
  if (!result) throw stats.ERR_NOT_FOUND;
  const jobs = await db.jobCollection
    .aggregate([
      {
        $match: { companyId: new ObjectId(_id) },
      },
      {
        $lookup: {
          from: "user",
          localField: "interviewerId",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $lookup: {
          from: "company",
          localField: "companyId",
          foreignField: "_id",
          as: "companys",
        },
      },
    ])
    .limit(6)
    .toArray();
  return [result, jobs];
}

// 职位数量
export async function getNumber(_id: string) {
  const result = await db.companyCollection.findOne({
    _id: new ObjectId(_id),
  });
  if (!result) throw stats.ERR_NOT_FOUND;
  const jobs = await db.jobCollection
    .find({
      companyId: new ObjectId(_id),
    })
    .toArray();
  return jobs.length;
}
