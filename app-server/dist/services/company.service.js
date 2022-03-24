"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetail = exports.companyList = void 0;
const mongodb_1 = require("mongodb");
const db = require("../db");
const stats_1 = require("../stats");
async function companyList() {
    const result = await db.companyCollection.find().limit(9).toArray();
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
        .find({
        companyId: new mongodb_1.ObjectId(_id),
    })
        .limit(6)
        .toArray();
    return [result, jobs];
}
exports.getDetail = getDetail;
//# sourceMappingURL=company.service.js.map