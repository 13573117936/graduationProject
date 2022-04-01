import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import style from "./style.module.css";
import Search from "../../components/Search";
import * as userAPI from "../../services/user.service";
import * as jobAPI from "../../services/job.service";
import * as companyAPI from "../../services/company.service";
import { ICompany, IJob, IUser } from "../../types";
import JobItem from "../../components/JobItem";
import CompanyItem from "../../components/CompanyItem";
export default function Main() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [companys, setCompanys] = useState<ICompany[]>([]);
  const [user, setUser] = useState<IUser | null>(null);

  const getData = async function () {
    const userInfo = await userAPI.userInfo();
    const jobList = await jobAPI.jobList(9);
    const companyList = await companyAPI.companyList(9);
    if (userInfo.stat === "OK") {
      console.log(userInfo.data);
      setUser(userInfo.data);
    }
    setJobs(jobList.list);
    setCompanys(companyList.list);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.back}>
      <Header select="main" user={user}></Header>
      <Search></Search>
      <div className={style.main}>
        <div className={style.text}>热招职位</div>
        <div className={style.job}>
          {jobs.map((item) => {
            return <JobItem key={item._id} size='small' item={item}></JobItem>;
          })}
        </div>

        <div className={style.text}>热门企业</div>
        <div className={style.job}>
          {companys.map((item) => {
            return <CompanyItem key={item._id} size='small' item={item}></CompanyItem>;
          })}
        </div>
      </div>
    </div>
  );
}
