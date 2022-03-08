import { Collection, WithId } from "mongodb";
import { ICompany, IJob, IUser } from "./types";
export declare let userCollection: Collection<WithId<IUser>>;
export declare let jobCollection: Collection<WithId<IJob>>;
export declare let companyCollection: Collection<WithId<ICompany>>;
export declare function connect(): Promise<void>;
