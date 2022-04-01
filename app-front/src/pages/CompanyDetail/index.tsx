// 职位详细信息
import React, { useState, useEffect, useCallback } from "react";
import "antd/dist/antd.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import IconFont from "../../assets/icon";
import { ICompany, IJob, IUser } from "../../types";
import * as Enum from "../../assets/enum";
import Toast from "../../components/Toast";
import JobItem from "../../components/JobItem";
import * as userAPI from "../../services/user.service";
import * as jobAPI from "../../services/job.service";
import Header from "../../components/Header";

import * as companyAPI from "../../services/company.service";

export default function CompanyDetail() {
  const [user, setUser] = useState<IUser | null>(null);
  const [company, setCompany] = useState<ICompany>();
  const [number, setNumber] = useState<number>(0);
  const [jobs, setJobs] = useState<IJob[]>([]);

  const param = useParams();

  // 获取数据
  const getData = async function () {
    const user = await userAPI.userInfo();
    if (user.stat === "OK") {
      setUser(user.data);
    }
    const num = await companyAPI.number(param.id!);
    setNumber(num.result);
    const companyInfo = await companyAPI.companyDetail(param.id!);
    console.log(companyInfo.jobs, companyInfo.data);
    setCompany(companyInfo.data);
    setJobs(companyInfo.jobs);
  };

  useEffect(() => {
    getData();
  }, [param]);

  return (
    <div className={style.back}>
      <Header select="companys" user={user}></Header>
      <div className={style.main}>
        <div className={style.title}>
          <div className={style.left}>
            <div>
              <img src={company?.logo} alt="" className={style.logo} />
            </div>
            <div>
              <div className={style.name}>{company?.companyShortName}</div>
              <div className={style.limit}>
                {Enum.toFinance(company?.financeStage)}
                <span className={style.vline}></span>
                {Enum.toSize(company?.companySize)}
                <span className={style.vline}></span>
                {company?.industryField}
              </div>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.number}>{number}</div>
            <div className={style.text}>在招职位</div>
          </div>
        </div>
        <div className={style.detail}>
          <div className={style.text}>公司简介</div>
          <div className={style.describe}>{company?.describe}</div>
          <div className={style.text}>热门职位</div>
          <div>
            {jobs.map((item) => {
              return (
                <JobItem size="large" item={item} key={item._id}></JobItem>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
