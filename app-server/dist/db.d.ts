import { Collection } from "mongodb";
import { ICompany, IJob, IUser } from "./types";
export declare let userCollection: Collection<IUser>;
export declare let jobCollection: Collection<IJob>;
export declare let companyCollection: Collection<ICompany>;
export declare function connect(): Promise<void>;
