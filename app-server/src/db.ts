import { MongoClient, Collection, WithId } from "mongodb";

import config from "./config";
import { ICompany, ICollection, IJob, IUser, IFile } from "./types";

let client: MongoClient;
export let userCollection: Collection<IUser>;
export let jobCollection: Collection<IJob>;
export let companyCollection: Collection<ICompany>;
export let favoriteCollection: Collection<ICollection>;
export let fileCollection: Collection<IFile>;

export async function connect() {
  client = await MongoClient.connect(`mongodb://${config.mongoHost}`);
  const db = client.db(config.mongoDb);
  userCollection = db.collection("user");
  jobCollection = db.collection("jobs");
  companyCollection = db.collection("company");
  favoriteCollection = db.collection("favorite");
  fileCollection = db.collection("file");
}
