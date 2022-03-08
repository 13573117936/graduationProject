"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../config.json"), "utf-8"));
exports.default = config;
//# sourceMappingURL=config.js.map