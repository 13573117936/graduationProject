"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetail = exports.jobList = void 0;
const mongodb_1 = require("mongodb");
const db = require("../db");
const stats_1 = require("../stats");
async function jobList(value = "") {
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
exports.jobList = jobList;
async function getDetail(_id) {
    const result = await db.jobCollection
        .aggregate([
        {
            $match: { _id: new mongodb_1.ObjectId(_id) },
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
    if (!result[0])
        throw stats_1.stats.ERR_NOT_FOUND;
    return result[0];
}
exports.getDetail = getDetail;
//# sourceMappingURL=jobs.service.js.map