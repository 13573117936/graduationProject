import { Binary, ObjectId } from 'mongodb';
export interface IUser {
    username: string;
    password: string;
    nickname: string;
    avatar: string;
    introduction: string;
}
export interface IArticle {
    title: string;
    content: string;
    banner?: string[];
    time: Date;
    author: ObjectId;
    label: string[];
    views: number;
    likes: number;
}
export interface ILike {
    userId: ObjectId;
    time: Date;
    articleId: ObjectId;
    title: string;
}
export interface IFollow {
    fromUserId: ObjectId;
    toUserId: ObjectId;
}
export interface IComment {
    userId: ObjectId;
    articleId: ObjectId;
    time: Date;
    content: string;
}
export interface IFile {
    key: string;
    data: Binary;
    name: string;
    size: number;
}
