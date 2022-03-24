import { Binary, ObjectId } from "mongodb";
import * as db from "../db";
import * as crypto from "crypto";
import { IUser } from "../types";
import { stats } from "../stats";
import * as fs from "fs";

// 职位列表
export async function jobList(value: string = "") {
  const result = await db.jobCollection
    .aggregate([
      {
        $match: { positionName: { $regex: value, $options: "i" } },
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
    .limit(9)
    .toArray();
  return result;
}

// 根据职位id查询职位信息
export async function getDetail(_id: string) {
  const result = await db.jobCollection
    .aggregate([
      {
        $match: { _id: new ObjectId(_id) },
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
    .toArray();
  if (!result[0]) throw stats.ERR_NOT_FOUND;
  return result[0];
}
