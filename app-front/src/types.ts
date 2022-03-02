import { Binary } from "mongodb";

/**
 * 权限
 */
export enum UserRole {
  /**
   * 招聘人
   */
  Employer = 1,
  /**
   * 应聘人
   */
  User = 2,
}

export enum UserSex {
  /**
   * 男
   */
  Man = 1,
  /**
   * 女
   */
  Woman = 2,
}

export interface IUser {
  /**
   * Id
   */
  _id: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 头像key
   */
  avatar: string;
  /**
   * 邮箱地址
   */
  email: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 性别
   */
  sex: UserSex;
  /**
   * 所属公司id
   */
  companyId: string | null;
  /**
   * 角色
   */
  role: UserRole;
}
