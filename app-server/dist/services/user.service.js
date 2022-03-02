"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.articles = exports.userFollows = exports.comments = exports.likes = exports.follow = exports.findFollow = exports.editPwd = exports.editInfo = exports.getInfo = exports.userInfo = exports.login = exports.register = exports.tokens = void 0;
const mongodb_1 = require("mongodb");
const db = require("../db");
const crypto = require("crypto");
const stats_1 = require("../stats");
const fs = require("fs");
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
        nickname: "用户：" + record.username,
        avatar: "aa2c07be5a04caefdd148ddfcb0a652a",
        introduction: "无",
    });
    return result.insertedId;
}
exports.register = register;
async function login(record) {
    const user = await db.userCollection.findOne({
        username: record.username,
    });
    if (user === undefined)
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
    const id = exports.tokens.get(token);
    const user = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(id),
    });
    if (user === undefined)
        throw stats_1.stats.ERR_NOT_LOGIN;
    return user;
}
exports.userInfo = userInfo;
async function getInfo(id) {
    const user = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(id),
    });
    if (user === undefined)
        throw stats_1.stats.ERR_NOT_FOUND;
    return user;
}
exports.getInfo = getInfo;
async function editInfo(token, record) {
    const id = exports.tokens.get(token);
    const user = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(id),
    });
    if (user === undefined)
        throw stats_1.stats.ERR_NOT_LOGIN;
    const res = await db.userCollection.findOneAndUpdate({
        _id: new mongodb_1.ObjectId(id),
    }, {
        $set: record,
    });
    return res;
}
exports.editInfo = editInfo;
async function editPwd(token, prePassword, newPassword) {
    const id = exports.tokens.get(token);
    const user = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(id),
    });
    if (user === undefined)
        throw stats_1.stats.ERR_NOT_LOGIN;
    const hash = crypto.createHash("sha1");
    hash.update(prePassword);
    prePassword = hash.digest("hex");
    if (user.password !== prePassword) {
        throw stats_1.stats.ERR_LOGIN_FAILED;
    }
    const hash2 = crypto.createHash("sha1");
    hash2.update(newPassword);
    newPassword = hash2.digest("hex");
    const res = await db.userCollection.findOneAndUpdate({
        _id: new mongodb_1.ObjectId(id),
    }, {
        $set: {
            password: newPassword,
        },
    });
    return res;
}
exports.editPwd = editPwd;
async function findFollow(userId, token) {
    const id = exports.tokens.get(token);
    const myuser = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(id),
    });
    if (myuser === undefined)
        throw stats_1.stats.ERR_NOT_LOGIN;
    const res = await db.followCollection.findOne({
        fromUserId: new mongodb_1.ObjectId(id),
        toUserId: new mongodb_1.ObjectId(userId),
    });
    if (res === undefined) {
        return false;
    }
    else {
        return true;
    }
}
exports.findFollow = findFollow;
async function follow(state, userId, token) {
    const id = exports.tokens.get(token);
    const myuser = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(id),
    });
    if (myuser === undefined)
        throw stats_1.stats.ERR_NOT_LOGIN;
    if (state === true) {
        await db.followCollection.findOneAndDelete({
            fromUserId: new mongodb_1.ObjectId(id),
            toUserId: new mongodb_1.ObjectId(userId),
        });
        return "已取消关注";
    }
    else {
        await db.followCollection.insertOne({
            fromUserId: new mongodb_1.ObjectId(id),
            toUserId: new mongodb_1.ObjectId(userId),
        });
        return "已关注";
    }
}
exports.follow = follow;
async function likes(id) {
    const rows = db.likeCollection.aggregate([
        {
            $match: { userId: new mongodb_1.ObjectId(id) },
        },
        {
            $lookup: {
                from: "user",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $lookup: {
                from: "article",
                localField: "articleId",
                foreignField: "_id",
                as: "article",
            },
        },
    ]);
    return rows.toArray();
}
exports.likes = likes;
async function comments(id) {
    const rows = db.commentCollection.find({
        userId: new mongodb_1.ObjectId(id),
    });
    return rows.toArray();
}
exports.comments = comments;
async function userFollows(id) {
    const rows = db.followCollection.find({
        fromUserId: new mongodb_1.ObjectId(id),
    });
    return rows.toArray();
}
exports.userFollows = userFollows;
async function articles(id) {
    if (id) {
        const rows = db.articleCollection
            .aggregate([
            {
                $match: { author: new mongodb_1.ObjectId(id) },
            },
            {
                $lookup: {
                    from: "user",
                    localField: "author",
                    foreignField: "_id",
                    as: "user",
                },
            },
        ])
            .toArray();
        return rows;
    }
    else {
        const rows = db.articleCollection
            .aggregate([
            {
                $match: {},
            },
            {
                $lookup: {
                    from: "user",
                    localField: "author",
                    foreignField: "_id",
                    as: "user",
                },
            },
        ])
            .toArray();
        return rows;
    }
}
exports.articles = articles;
async function upload(token, path, size, name) {
    const _id = exports.tokens.get(token);
    const key = crypto.randomBytes(16).toString("hex");
    const data = await fs.promises.readFile(path);
    await db.fileCollection.insertOne({
        key: key,
        data: new mongodb_1.Binary(data),
        size: size,
        name: name,
    });
    await db.userCollection.findOneAndUpdate({
        _id: new mongodb_1.ObjectId(_id),
    }, {
        $set: {
            avatar: key,
        },
    });
    await fs.promises.unlink(path);
    return key;
}
exports.upload = upload;
//# sourceMappingURL=user.service.js.map