export enum Status {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500,
}

export class ReqStat {
  stat: string;
  msg: string;
  statusCode: number;

  constructor(stat: string, msg: string, statusCode: number = Status.OK) {
    this.stat = stat;
    this.msg = msg;
    this.statusCode = statusCode;
  }
}

export function badParams(message: string) {
  return new ReqStat("ERR_PARAMS", message, Status.BadRequest);
}

export const stats = {
  ERR_EXISTS: new ReqStat("ERR_EXISTS", "记录已存在"),
  ERR_NOT_FOUND: new ReqStat("ERR_NOT_FOUND", "记录不存在",Status.NotFound),
  ERR_USER_NOT_FOUND: new ReqStat("ERR_USER_NOT_FOUND", "找不到指定用户"),
  ERR_NOT_LOGIN: new ReqStat("ERR_NOT_LOGIN", "用户未登录"),
  ERR_LOGIN_FAILED: new ReqStat("ERR_LOGIN_FAILED", "密码不正确"),
  ERR_PASSWORD_REPEAT: new ReqStat("ERR_PASSWORD_REPEAT", "新密码与旧密码一致"),
  ERR_FORBIDDEN: new ReqStat("ERR_FORBIDDEN", "您未被企业添加，无权限发布职位"),
};
