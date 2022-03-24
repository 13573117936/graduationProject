import { MongoClient, Collection, WithId } from "mongodb";

import config from "./config";
import { ICompany, IJob, IUser } from "./types";

let client: MongoClient;
export let userCollection: Collection<IUser>;
export let jobCollection: Collection<IJob>;
export let companyCollection: Collection<ICompany>;

export async function connect() {
  client = await MongoClient.connect(`mongodb://${config.mongoHost}`);
  const db = client.db(config.mongoDb);
  userCollection = db.collection("user");
  jobCollection = db.collection("recruit");
  companyCollection = db.collection("company");
}
