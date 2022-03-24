import { ObjectId } from "mongodb";
import { IUser } from "../types";
export declare const tokens: Map<string, ObjectId>;
export declare function register(record: IUser): Promise<string>;
export declare function login(record: IUser): Promise<string>;
export declare function userInfo(token: string): Promise<import("mongodb").WithId<IUser>>;
export declare function getDetail(_id: string): Promise<import("mongodb").WithId<IUser>>;
