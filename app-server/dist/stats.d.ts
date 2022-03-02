export declare enum Status {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    InternalServerError = 500
}
export declare class ReqStat {
    stat: string;
    msg: string;
    statusCode: number;
    constructor(stat: string, msg: string, statusCode?: number);
}
export declare function badParams(message: string): ReqStat;
export declare const stats: {
    ERR_EXISTS: ReqStat;
    ERR_NOT_FOUND: ReqStat;
    ERR_USER_NOT_FOUND: ReqStat;
    ERR_NOT_LOGIN: ReqStat;
    ERR_LOGIN_FAILED: ReqStat;
    ERR_PASSWORD_REPEAT: ReqStat;
    ERR_FORBIDDEN: ReqStat;
};
