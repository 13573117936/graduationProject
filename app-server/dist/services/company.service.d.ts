export declare function companyList(): Promise<import("mongodb").WithId<import("../types").ICompany>[]>;
export declare function getDetail(_id: string): Promise<(import("mongodb").WithId<import("../types").ICompany> | import("mongodb").WithId<import("../types").IJob>[])[]>;
