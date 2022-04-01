import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import style from "./style.module.css";
import Search from "../../components/Search";
import * as jobAPI from "../../services/job.service";
import * as companyAPI from "../../services/company.service";
import { ICompany, IJob } from "../../types";
import JobItem from "../../components/JobItem";
import { useParams } from "react-router-dom";
import { Button } from "antd";


export default function Jobs() {
  const [page, setPage] = useState<number>(0);
  const [jobs, setJobs] = useState<IJob[]>([]);

  const param = useParams();

  const getData = async function () {
    console.log(param.value?.split("="), page);
    if (param.value?.split("=")[1]) {
      const jobList = await jobAPI.jobList(
        9,
        page * 9,
        param.value?.split("=")[1]
      );
      setJobs(jobList.list);
    } else {
      const jobList = await jobAPI.jobList(9, page * 9);
      setJobs(jobList.list);
    }
  };

  useEffect(() => {
    getData();
  }, [page, param]);

  return (
    <div className={style.back}>
      <Header select="jobs" user={null}></Header>
      <Search></Search>
      <div className={style.main}>
        <div className={param.value?.split("=")[1]? style.value:style.none}>{"'"+param.value?.split("=")[1]+"'"}的搜索结果</div>
        <div className={style.job}>
          {jobs.map((item) => {
            return <JobItem key={item._id} size="large" item={item}></JobItem>;
          })}
        </div>
        <div>
          <Button
            className={style.button}
            onClick={() => setPage(page - 1)}
            disabled={page === 0 ? true : false}
          >
            上一页
          </Button>
          <Button
            className={style.button}
            onClick={() => setPage(page + 1)}
            disabled={jobs.length < 9 ? true : false}
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  );
}
