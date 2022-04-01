import { Collection } from "mongodb";
import { ICompany, IFavorite, IJob, IUser } from "./types";
export declare let userCollection: Collection<IUser>;
export declare let jobCollection: Collection<IJob>;
export declare let companyCollection: Collection<ICompany>;
export declare let favoriteCollection: Collection<IFavorite>;
export declare function connect(): Promise<void>;
