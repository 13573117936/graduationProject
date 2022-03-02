"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.fileCollection = exports.commentCollection = exports.likeCollection = exports.articleCollection = exports.followCollection = exports.userCollection = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("./config");
let client;
async function connect() {
    client = await mongodb_1.MongoClient.connect(`mongodb://${config_1.default.mongoHost}`);
    const db = client.db(config_1.default.mongoDb);
    exports.userCollection = db.collection('user');
    exports.followCollection = db.collection('follow');
    exports.articleCollection = db.collection('article');
    exports.likeCollection = db.collection('like');
    exports.commentCollection = db.collection('comment');
    exports.fileCollection = db.collection('file');
}
exports.connect = connect;
//# sourceMappingURL=db.js.map