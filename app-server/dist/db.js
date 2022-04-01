"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.favoriteCollection = exports.companyCollection = exports.jobCollection = exports.userCollection = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("./config");
let client;
async function connect() {
    client = await mongodb_1.MongoClient.connect(`mongodb://${config_1.default.mongoHost}`);
    const db = client.db(config_1.default.mongoDb);
    exports.userCollection = db.collection("user");
    exports.jobCollection = db.collection("jobs");
    exports.companyCollection = db.collection("company");
    exports.favoriteCollection = db.collection("favorite");
}
exports.connect = connect;
//# sourceMappingURL=db.js.map