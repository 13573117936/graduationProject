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
  // id
  _id: string;

  // 用户名(手机号)
  username: string;

  // 密码
  password: string;

  // 头像key值
  avatar: string;

  // 邮箱
  email: string;

  // 姓名
  name: string;

  // 性别
  sex: UserSex;

  // 公司id
  companyId: string | null;

  // 角色
  role: UserRole;
}

export interface IJob {
  // id
  _id: string;

  // 职位名称
  positionName: string;

  // 薪资范围
  salary: { min: number; max: number };

  // 城市
  city: string;

  // 工作经验限制
  workYear: Year;

  // 最低学历
  education: Education;

  // 公司id
  companyId: string;

  // 信息创建时间
  time: string;

  // 信息更新时间
  updatedAt: string;

  // 详细地址
  location: string;

  // 招聘人id
  interviewerId: string;

  // 描述词
  keyWords: string[];

  // 职位描述
  describe: string;

  // 公司信息
  companys: ICompany[];

  // 发布人信息
  users: IUser[];
}

export interface ICompany {
  // id
  _id?: string;

  // 公司简称
  companyShortName: string;

  // 公司全称
  companyFullName: string;

  // 公司创始人id
  userId: string;

  // 公司规模
  companySize: companySize;

  // 行业分类
  industryField: string;

  // 信息创建时间
  time: string;

  // 信息更新时间
  updateAt: string;

  // logo图地址
  logo: string;

  // 融资情况
  financeStage: FinanceStage;

  // 简洁
  describe: string;

  // 热度
  like: string;

  // 热招职位
  recruits: IJob[];
}

/**
 * 学历范围
 */
export enum Education {
  /**
   * 不限
   */
  unlimit = 1,
  /**
   * 初中及以下
   */
  junior = 2,
  /**
   * 中专/中技
   */
  secondary = 3,
  /**
   * 高中
   */
  highSchool = 4,
  /**
   * 大专
   */
  juniorCollege = 5,
  /**
   * 本科
   */
  undergraduate = 6,
  /**
   * 硕士
   */
  master = 7,
  /**
   * 博士
   */
  doctor = 8,
}

/**
 * 工作经验范围
 */
export enum Year {
  /**
   * 不限
   */
  unlimit = 1,
  /**
   * 在校生
   */
  enrollment = 2,
  /**
   *应届生
   */
  fresh = 3,
  /**
   * 1年以内
   */
  withinOne = 4,
  /**
   * 1-3年
   */
  WithinThree = 5,
  /**
   * 3-5年
   */
  WithinFive = 6,
  /**
   *5-10年
   */
  Withinten = 7,
  /**
   * 十年以上
   */
  decade = 8,
}

/**
 * 公司规模范围
 */
export enum companySize {
  /**
   * 不限
   */
  unlimit = 1,
  /**
   *0-20人
   */
  lessTwenty = 2,
  /**
   *20-99人
   */
  lessOhundred = 3,
  /**
   *100-499人
   */
  lessFhundred = 4,
  /**
   * 500-999人
   */
  lessOthousand = 5,
  /**
   * 1000-9999人
   */
  lessTthousand = 6,
  /**
   *10000人以上
   */
  moreTthousand = 7,
}

/**
 * 公司融资情况
 */
export enum FinanceStage {
  /**
   * 不限
   */
  unlimit = 1,
  /**
   *未融资
   */
  Unfunded = 2,
  /**
   *天使轮
   */
  angelwheel = 3,
  /**
   *A轮
   */
  awheel = 4,
  /**
   * B轮
   */
  bwheel = 5,
  /**
   * C轮
   */
  cwheel = 6,
  /**
   *D轮及以上
   */
  dwheel = 7,
  /**
   *已上市
   */
  listed = 8,
  /**
   *不需要融资
   */
  noFinancing = 9,
}
