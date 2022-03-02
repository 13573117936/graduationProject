"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stats = exports.badParams = exports.ReqStat = exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["OK"] = 200] = "OK";
    Status[Status["BadRequest"] = 400] = "BadRequest";
    Status[Status["Unauthorized"] = 401] = "Unauthorized";
    Status[Status["Forbidden"] = 403] = "Forbidden";
    Status[Status["NotFound"] = 404] = "NotFound";
    Status[Status["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    Status[Status["InternalServerError"] = 500] = "InternalServerError";
})(Status = exports.Status || (exports.Status = {}));
class ReqStat {
    constructor(stat, msg, statusCode = Status.OK) {
        this.stat = stat;
        this.msg = msg;
        this.statusCode = statusCode;
    }
}
exports.ReqStat = ReqStat;
function badParams(message) {
    return new ReqStat('ERR_PARAMS', message, Status.BadRequest);
}
exports.badParams = badParams;
exports.stats = {
    ERR_EXISTS: new ReqStat('ERR_EXISTS', '记录已存在'),
    ERR_NOT_FOUND: new ReqStat('ERR_NOT_FOUND', '记录不存在'),
    ERR_USER_NOT_FOUND: new ReqStat('ERR_USER_NOT_FOUND', '找不到指定用户'),
    ERR_NOT_LOGIN: new ReqStat('ERR_NOT_LOGIN', '用户未登录'),
    ERR_LOGIN_FAILED: new ReqStat('ERR_LOGIN_FAILED', '密码不正确'),
    ERR_PASSWORD_REPEAT: new ReqStat('ERR_PASSWORD_REPEAT', '新密码与旧密码一致'),
    ERR_FORBIDDEN: new ReqStat('ERR_FORBIDDEN', '您未被企业添加，无权限发布职位')
};
//# sourceMappingURL=stats.js.map