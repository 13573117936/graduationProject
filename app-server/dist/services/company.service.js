"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumber = exports.getDetail = exports.companyList = void 0;
const mongodb_1 = require("mongodb");
const db = require("../db");
const stats_1 = require("../stats");
async function companyList(limit, value = "", skip = 0) {
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
exports.companyList = companyList;
async function getDetail(_id) {
    const result = await db.companyCollection.findOne({
        _id: new mongodb_1.ObjectId(_id),
    });
    if (!result)
        throw stats_1.stats.ERR_NOT_FOUND;
    const jobs = await db.jobCollection
        .aggregate([
        {
            $match: { companyId: new mongodb_1.ObjectId(_id) },
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
exports.getDetail = getDetail;
async function getNumber(_id) {
    const result = await db.companyCollection.findOne({
        _id: new mongodb_1.ObjectId(_id),
    });
    if (!result)
        throw stats_1.stats.ERR_NOT_FOUND;
    const jobs = await db.jobCollection
        .find({
        companyId: new mongodb_1.ObjectId(_id),
    })
        .toArray();
    return jobs.length;
}
exports.getNumber = getNumber;
//# sourceMappingURL=company.service.js.map