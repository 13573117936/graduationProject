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
    .toArray();
  return result;
}
