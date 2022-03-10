import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import style from "./style.module.css";
import Search from "../../components/Search";
import * as jobAPI from "../../services/job.service";
import * as companyAPI from "../../services/company.service";
import { ICompany, IJob } from "../../types";
import JobItem from "../../components/JobItem";

export default function Main() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [companys, setCompanys] = useState<ICompany[]>([]);

  const getData = async function () {
    const jobList = await jobAPI.jobList();
    //const companyList = await companyAPI.companyList();
    setJobs(jobList.result);
    //setCompanys(companyList.result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.back}>
      <Header user={null}></Header>
      <Search></Search>
      <div className={style.main}>
        <div className={style.text}>-热招职位-</div>
        <div className={style.job}>
          {jobs.map((item) => {
            return <JobItem item={item}></JobItem>;
          })}
        </div>
        <div className={style.text}>-热门企业-</div>
        {/* <div className={style.company}>
          {companys.map((item) => {
            return (
              <div className={style.item}>
                {item.companyShortName}
                {item.companyFullName}
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
}
