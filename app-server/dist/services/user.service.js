"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetail = exports.userInfo = exports.login = exports.register = exports.tokens = void 0;
const mongodb_1 = require("mongodb");
const db = require("../db");
const crypto = require("crypto");
const stats_1 = require("../stats");
exports.tokens = new Map();
async function register(record) {
    const user = await db.userCollection.findOne({
        username: record.username,
    });
    if (user)
        throw stats_1.stats.ERR_EXISTS;
    const hash = crypto.createHash("sha1");
    hash.update(record.password);
    record.password = hash.digest("hex");
    const result = await db.userCollection.insertOne({
        username: record.username,
        password: record.password,
        avatar: "",
        email: "",
        name: "用户" + record.username,
        sex: 1,
        companyId: "",
        role: 2,
    });
    const token = crypto.randomBytes(12).toString("hex");
    exports.tokens.set(token, result.insertedId);
    return token;
}
exports.register = register;
async function login(record) {
    const user = await db.userCollection.findOne({
        username: record.username,
    });
    if (!user)
        throw stats_1.stats.ERR_USER_NOT_FOUND;
    const hash = crypto.createHash("sha1");
    hash.update(record.password);
    record.password = hash.digest("hex");
    if (user.password !== record.password) {
        throw stats_1.stats.ERR_LOGIN_FAILED;
    }
    const token = crypto.randomBytes(12).toString("hex");
    exports.tokens.set(token, user._id);
    return token;
}
exports.login = login;
async function userInfo(token) {
    const _id = exports.tokens.get(token);
    const user = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(_id),
    }, {
        projection: {
            password: 0,
            isDisabled: 0,
        },
    });
    if (!user)
        throw stats_1.stats.ERR_NOT_LOGIN;
    return user;
}
exports.userInfo = userInfo;
async function getDetail(_id) {
    const user = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(_id),
    });
    if (!user)
        throw stats_1.stats.ERR_NOT_FOUND;
    return user;
}
exports.getDetail = getDetail;
//# sourceMappingURL=user.service.js.map