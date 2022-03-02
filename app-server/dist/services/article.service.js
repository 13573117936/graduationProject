"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = exports.upload = exports.comments = exports.detail = exports.search = exports.remove = exports.edit = exports.post = exports.removeComment = exports.view = exports.comment = exports.like = exports.findLike = void 0;
const mongodb_1 = require("mongodb");
const db = require("../db");
const crypto = require("crypto");
const stats_1 = require("../stats");
const user_service_1 = require("./user.service");
const fs = require("fs");
async function findLike(articleId, token) {
    const id = user_service_1.tokens.get(token);
    const myuser = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(id)
    });
    if (myuser === undefined)
        throw stats_1.stats.ERR_NOT_LOGIN;
    const res = await db.likeCollection.findOne({
        userId: new mongodb_1.ObjectId(id),
        articleId: new mongodb_1.ObjectId(articleId)
    });
    if (res === undefined) {
        return false;
    }
    else {
        return true;
    }
}
exports.findLike = findLike;
async function like(state, articleId, articleName, token) {
    const id = user_service_1.tokens.get(token);
    const myuser = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(id)
    });
    if (myuser === undefined)
        throw stats_1.stats.ERR_NOT_LOGIN;
    const article = await db.articleCollection.findOne({
        _id: new mongodb_1.ObjectId(articleId)
    });
    if (state === true) {
        await db.likeCollection.findOneAndDelete({
            userId: new mongodb_1.ObjectId(id),
            articleId: new mongodb_1.ObjectId(articleId)
        });
        await db.articleCollection.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(articleId)
        }, {
            $set: {
                likes: article.likes - 1
            }
        });
    }
    else {
        await db.likeCollection.insertOne({
            userId: new mongodb_1.ObjectId(id),
            time: new Date(),
            articleId: new mongodb_1.ObjectId(articleId),
            title: articleName
        });
        await db.articleCollection.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(articleId)
        }, {
            $set: {
                likes: article.likes + 1
            }
        });
    }
    return 'ok';
}
exports.like = like;
async function comment(articleId, token, content) {
    const id = user_service_1.tokens.get(token);
    const myuser = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(id)
    });
    if (myuser === undefined)
        throw stats_1.stats.ERR_NOT_LOGIN;
    await db.commentCollection.insertOne({
        userId: new mongodb_1.ObjectId(id),
        time: new Date(),
        articleId: new mongodb_1.ObjectId(articleId),
        content: content
    });
    return 'ok';
}
exports.comment = comment;
async function view(articleId) {
    const res = await db.articleCollection.findOne({
        _id: new mongodb_1.ObjectId(articleId)
    });
    if (res === undefined)
        throw stats_1.stats.ERR_NOT_FOUND;
    await db.articleCollection.findOneAndUpdate({
        _id: new mongodb_1.ObjectId(articleId)
    }, {
        $set: {
            views: res.views + 1
        }
    });
    return 'ok';
}
exports.view = view;
async function removeComment(id) {
    await db.commentCollection.findOneAndDelete({
        _id: new mongodb_1.ObjectId(id)
    });
    return 'ok';
}
exports.removeComment = removeComment;
async function post(article, token) {
    const id = user_service_1.tokens.get(token);
    const myuser = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(id)
    });
    if (myuser === undefined)
        throw stats_1.stats.ERR_NOT_LOGIN;
    await db.articleCollection.insertOne({
        title: article.title,
        content: article.content,
        author: new mongodb_1.ObjectId(id),
        time: new Date(),
        banner: article.banner,
        label: article.label,
        views: 0,
        likes: 0
    });
    return 'ok';
}
exports.post = post;
async function edit(id, article, token) {
    const id1 = user_service_1.tokens.get(token);
    const myuser = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(id1)
    });
    if (myuser === undefined)
        throw stats_1.stats.ERR_NOT_LOGIN;
    await db.articleCollection.findOneAndUpdate({
        _id: new mongodb_1.ObjectId(id)
    }, {
        $set: {
            time: new Date(),
            label: article.label,
            content: article.content,
            title: article.title,
            banner: article.banner
        }
    });
    return 'ok';
}
exports.edit = edit;
async function remove(_id, token) {
    const id = user_service_1.tokens.get(token);
    const myuser = await db.userCollection.findOne({
        _id: new mongodb_1.ObjectId(id)
    });
    if (myuser === undefined)
        throw stats_1.stats.ERR_NOT_LOGIN;
    await db.articleCollection.findOneAndDelete({
        _id: new mongodb_1.ObjectId(_id)
    });
    const rows = await db.commentCollection
        .find({
        articleId: new mongodb_1.ObjectId(_id)
    })
        .toArray();
    rows.map(async (item) => {
        await db.commentCollection.findOneAndDelete({
            _id: item._id
        });
    });
    await db.likeCollection.findOneAndDelete({
        articleId: new mongodb_1.ObjectId(_id)
    });
    return 'ok';
}
exports.remove = remove;
async function search(str) {
    const res = await db.articleCollection
        .aggregate([
        {
            $match: { title: { $regex: str, $options: 'i' } }
        },
        {
            $lookup: {
                from: 'user',
                localField: 'author',
                foreignField: '_id',
                as: 'user'
            }
        }
    ])
        .toArray();
    const res2 = await db.articleCollection.find({
        label: { $elemMatch: { $regex: str, $options: 'i' } }
    }).toArray();
    res.concat(res2);
    return res;
}
exports.search = search;
async function detail(id) {
    const res = await db.articleCollection
        .aggregate([
        {
            $match: { _id: new mongodb_1.ObjectId(id) }
        },
        {
            $lookup: {
                from: 'user',
                localField: 'author',
                foreignField: '_id',
                as: 'user'
            }
        }
    ])
        .toArray();
    return res;
}
exports.detail = detail;
async function comments(articleId) {
    const res = await db.commentCollection
        .aggregate([
        {
            $match: { articleId: new mongodb_1.ObjectId(articleId) }
        },
        {
            $lookup: {
                from: 'user',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        }
    ])
        .toArray();
    return res;
}
exports.comments = comments;
async function upload(path, size, name) {
    const key = crypto.randomBytes(16).toString('hex');
    const data = await fs.promises.readFile(path);
    await db.fileCollection.insertOne({
        key: key,
        data: new mongodb_1.Binary(data),
        size: size,
        name: name
    });
    await fs.promises.unlink(path);
    return key;
}
exports.upload = upload;
async function download(key) {
    const result = await db.fileCollection.findOne({
        key: key
    });
    if (!result)
        throw stats_1.stats.ERR_NOT_FOUND;
    return result;
}
exports.download = download;
//# sourceMappingURL=article.service.js.map