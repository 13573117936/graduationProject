import { ObjectId } from "mongodb";
export declare enum UserRole {
    Employer = 1,
    User = 2
}
export declare enum UserSex {
    Man = 1,
    Woman = 2
}
export interface IUser {
    username: string;
    password: string;
    avatar: string;
    email: string;
    name: string;
    sex: UserSex;
    companyId: string | null;
    role: UserRole;
}
export interface IJob {
    positionName: string;
    salary: {
        min: number;
        max: number;
    };
    city: string;
    workYear: Year;
    education: Education;
    companyId: ObjectId;
    time: string;
    updatedAt: string;
    location: string;
    interviewerId: string;
    keyWords: string[];
    describe: string;
}
export interface ICompany {
    companyShortName: string;
    companyFullName: string;
    userId: string;
    companySize: companySize;
    industryField: string;
    time: string;
    updateAt: string;
    logo: string;
    financeStage: FinanceStage;
    describe: string;
    like: string;
}
export declare enum Education {
    unlimit = 1,
    junior = 2,
    secondary = 3,
    highSchool = 4,
    juniorCollege = 5,
    undergraduate = 6,
    master = 7,
    doctor = 8
}
export declare enum Year {
    unlimit = 1,
    enrollment = 2,
    fresh = 3,
    withinOne = 4,
    WithinThree = 5,
    WithinFive = 6,
    Withinten = 7,
    decade = 8
}
export declare enum companySize {
    unlimit = 1,
    lessTwenty = 2,
    lessOhundred = 3,
    lessFhundred = 4,
    lessOthousand = 5,
    lessTthousand = 6,
    moreTthousand = 7
}
export declare enum FinanceStage {
    unlimit = 1,
    Unfunded = 2,
    angelwheel = 3,
    awheel = 4,
    bwheel = 5,
    cwheel = 6,
    dwheel = 7,
    listed = 8,
    noFinancing = 9
}
