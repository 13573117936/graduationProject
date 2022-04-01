export declare function jobList(limit: number, value?: string, skip?: number): Promise<import("bson").Document[]>;
export declare function getDetail(_id: string): Promise<import("bson").Document>;
export declare function findFavorite(jobId: string, token: string): Promise<boolean>;
export declare function doFavorite(state: boolean, jobId: string, token: string): Promise<boolean>;
