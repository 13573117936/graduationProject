import { Year, Education, companySize, FinanceStage } from "../types";

// 工作经验
export function toYear(num: Year = -1) {
  switch (num) {
    case Year.unlimit:
      return "不限";
    case Year.enrollment:
      return "在校生";
    case Year.fresh:
      return "应届生";
    case Year.withinOne:
      return "1年以内";
    case Year.withinThree:
      return "1-3年";
    case Year.withinFive:
      return "3-5年";
    case Year.withinten:
      return "5-10年";
    case Year.decade:
      return "十年以上";
    default:
      return;
  }
}
// 学历
export function toEducation(num: Education = -1) {
  switch (num) {
    case Education.unlimit:
      return "不限";
    case Education.junior:
      return "初中及以下";
    case Education.secondary:
      return "中专/中技";
    case Education.highSchool:
      return "高中";
    case Education.juniorCollege:
      return "大专";
    case Education.undergraduate:
      return "本科";
    case Education.master:
      return "硕士";
    case Education.doctor:
      return "博士";
    default:
      return;
  }
}
// 公司规模
export function toSize(num: companySize = -1) {
  switch (num) {
    case companySize.unlimit:
      return "不限";
    case companySize.lessTwenty:
      return "0-20人";
    case companySize.lessOhundred:
      return "20-99人";
    case companySize.lessFhundred:
      return "100-499人";
    case companySize.lessOthousand:
      return "500-999人";
    case companySize.lessTthousand:
      return "1000-9999人";
    case companySize.moreTthousand:
      return "10000人以上";
    default:
      return;
  }
}
// 融资情况
export function toFinance(num: FinanceStage = -1) {
  switch (num) {
    case FinanceStage.unlimit:
      return "不限";
    case FinanceStage.unfunded:
      return "未融资";
    case FinanceStage.angelwheel:
      return "天使轮";
    case FinanceStage.awheel:
      return "A轮";
    case FinanceStage.bwheel:
      return "B轮";
    case FinanceStage.cwheel:
      return "C轮";
    case FinanceStage.dwheel:
      return "D轮及以上";
    case FinanceStage.listed:
      return "已上市";
    case FinanceStage.noFinancing:
      return "不需要融资";

    default:
      return;
  }
}
