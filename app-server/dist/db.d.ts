import { Collection } from 'mongodb';
import { IArticle, IComment, IFile, IFollow, ILike, IUser } from './types';
export declare let userCollection: Collection<IUser>;
export declare let followCollection: Collection<IFollow>;
export declare let articleCollection: Collection<IArticle>;
export declare let likeCollection: Collection<ILike>;
export declare let commentCollection: Collection<IComment>;
export declare let fileCollection: Collection<IFile>;
export declare function connect(): Promise<void>;
