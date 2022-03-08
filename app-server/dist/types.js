"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceStage = exports.companySize = exports.Year = exports.Education = exports.UserSex = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["Employer"] = 1] = "Employer";
    UserRole[UserRole["User"] = 2] = "User";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var UserSex;
(function (UserSex) {
    UserSex[UserSex["Man"] = 1] = "Man";
    UserSex[UserSex["Woman"] = 2] = "Woman";
})(UserSex = exports.UserSex || (exports.UserSex = {}));
var Education;
(function (Education) {
    Education[Education["unlimit"] = 1] = "unlimit";
    Education[Education["junior"] = 2] = "junior";
    Education[Education["secondary"] = 3] = "secondary";
    Education[Education["highSchool"] = 4] = "highSchool";
    Education[Education["juniorCollege"] = 5] = "juniorCollege";
    Education[Education["undergraduate"] = 6] = "undergraduate";
    Education[Education["master"] = 7] = "master";
    Education[Education["doctor"] = 8] = "doctor";
})(Education = exports.Education || (exports.Education = {}));
var Year;
(function (Year) {
    Year[Year["unlimit"] = 1] = "unlimit";
    Year[Year["enrollment"] = 2] = "enrollment";
    Year[Year["fresh"] = 3] = "fresh";
    Year[Year["withinOne"] = 4] = "withinOne";
    Year[Year["WithinThree"] = 5] = "WithinThree";
    Year[Year["WithinFive"] = 6] = "WithinFive";
    Year[Year["Withinten"] = 7] = "Withinten";
    Year[Year["decade"] = 8] = "decade";
})(Year = exports.Year || (exports.Year = {}));
var companySize;
(function (companySize) {
    companySize[companySize["unlimit"] = 1] = "unlimit";
    companySize[companySize["lessTwenty"] = 2] = "lessTwenty";
    companySize[companySize["lessOhundred"] = 3] = "lessOhundred";
    companySize[companySize["lessFhundred"] = 4] = "lessFhundred";
    companySize[companySize["lessOthousand"] = 5] = "lessOthousand";
    companySize[companySize["lessTthousand"] = 6] = "lessTthousand";
    companySize[companySize["moreTthousand"] = 7] = "moreTthousand";
})(companySize = exports.companySize || (exports.companySize = {}));
var FinanceStage;
(function (FinanceStage) {
    FinanceStage[FinanceStage["unlimit"] = 1] = "unlimit";
    FinanceStage[FinanceStage["Unfunded"] = 2] = "Unfunded";
    FinanceStage[FinanceStage["angelwheel"] = 3] = "angelwheel";
    FinanceStage[FinanceStage["awheel"] = 4] = "awheel";
    FinanceStage[FinanceStage["bwheel"] = 5] = "bwheel";
    FinanceStage[FinanceStage["cwheel"] = 6] = "cwheel";
    FinanceStage[FinanceStage["dwheel"] = 7] = "dwheel";
    FinanceStage[FinanceStage["listed"] = 8] = "listed";
    FinanceStage[FinanceStage["noFinancing"] = 9] = "noFinancing";
})(FinanceStage = exports.FinanceStage || (exports.FinanceStage = {}));
//# sourceMappingURL=types.js.map