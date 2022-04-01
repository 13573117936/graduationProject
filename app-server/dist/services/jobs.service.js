"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doFavorite = exports.findFavorite = exports.getDetail = exports.jobList = void 0;
const mongodb_1 = require("mongodb");
const db = require("../db");
const stats_1 = require("../stats");
const user_service_1 = require("./user.service");
async function jobList(limit, value = "", skip = 0) {
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
async function findFavorite(jobId, token) {
    const id = user_service_1.tokens.get(token);
    if (!id)
        return false;
    const res = await db.favoriteCollection.findOne({
        userId: new mongodb_1.ObjectId(id),
        jobId: new mongodb_1.ObjectId(jobId),
    });
    return res ? true : false;
}
exports.findFavorite = findFavorite;
async function doFavorite(state, jobId, token) {
    const id = user_service_1.tokens.get(token);
    if (!id)
        throw stats_1.stats.ERR_NOT_LOGIN;
    if (state) {
        await db.favoriteCollection.findOneAndDelete({
            userId: new mongodb_1.ObjectId(id),
            jobId: new mongodb_1.ObjectId(jobId),
        });
        return false;
    }
    else {
        await db.favoriteCollection.insertOne({
            userId: new mongodb_1.ObjectId(id),
            jobId: new mongodb_1.ObjectId(jobId),
            time: new Date(),
        });
        return true;
    }
}
exports.doFavorite = doFavorite;
//# sourceMappingURL=jobs.service.js.map