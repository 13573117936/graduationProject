"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobList = void 0;
const db = require("../db");
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
        .toArray();
    return result;
}
exports.jobList = jobList;
//# sourceMappingURL=jobs.service.js.map