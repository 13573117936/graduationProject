export declare function companyList(limit: number, value?: string, skip?: number): Promise<import("bson").Document[]>;
export declare function getDetail(_id: string): Promise<(import("bson").Document[] | import("mongodb").WithId<import("../types").ICompany>)[]>;
export declare function getNumber(_id: string): Promise<number>;
