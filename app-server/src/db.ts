import { MongoClient, Collection, WithId } from 'mongodb'

import config from './config'
import { IArticle, IComment, IFile, IFollow, ILike, IUser } from './types'

let client: MongoClient
export let userCollection: Collection<IUser>
export let followCollection: Collection<IFollow>
export let articleCollection: Collection<IArticle>
export let likeCollection: Collection<ILike>
export let commentCollection: Collection<IComment>
export let fileCollection: Collection<IFile>
export async function connect() {
  client = await MongoClient.connect(`mongodb://${config.mongoHost}`)
  const db = client.db(config.mongoDb)
  userCollection = db.collection('user')
  followCollection = db.collection('follow')
  articleCollection = db.collection('article')
  likeCollection = db.collection('like')
  commentCollection = db.collection('comment')
  fileCollection = db.collection('file')
}
