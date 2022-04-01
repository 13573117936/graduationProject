import { Binary, ObjectId } from "mongodb";
import * as db from "../db";
import * as crypto from "crypto";
import { IUser } from "../types";
import { stats } from "../stats";
import { tokens } from "./user.service";
import * as fs from "fs";

// 职位列表
export async function jobList(
  limit: number,
  value: string = "",
  skip: number = 0
) {
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
    .skip(skip)
    .limit(limit)
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

// 查看是否已收藏
export async function findFavorite(jobId: string, token: string) {
  const id = tokens.get(token);
  if (!id) return false;

  const res = await db.favoriteCollection.findOne({
    userId: new ObjectId(id),
    jobId: new ObjectId(jobId),
  });
  return res ? true : false;
}

// 收藏、取消收藏
export async function doFavorite(state: boolean, jobId: string, token: string) {
  const id = tokens.get(token);
  if (!id) throw stats.ERR_NOT_LOGIN;

  if (state) {
    await db.favoriteCollection.findOneAndDelete({
      userId: new ObjectId(id),
      jobId: new ObjectId(jobId),
    });
    return false;
  } else {
    await db.favoriteCollection.insertOne({
      userId: new ObjectId(id),
      jobId: new ObjectId(jobId),
      time: new Date(),
    });
    return true;
  }
}
