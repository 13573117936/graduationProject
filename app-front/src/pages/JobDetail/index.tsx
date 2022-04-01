// 职位详细信息
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Map, Marker } from "react-amap";
import "antd/dist/antd.css";
import { Button } from "antd";
import Toast from "../../components/Toast";
import Header from "../../components/Header";
import * as Enum from "../../assets/enum";
import IconFont from "../../assets/icon";
import { IJob, IUser } from "../../types";
import * as userAPI from "../../services/user.service";
import * as jobAPI from "../../services/job.service";
import style from "./style.module.css";

const mapKey = "1bda83d516a5a2dac1d89ea7d1544b31";

export default function CompanyDeatil() {
  const [user, setUser] = useState<IUser | null>(null);
  const [job, setJob] = useState<IJob>();
  const [location, setLocation] = useState<string>("1,1"); //地图坐标
  const [isFavorite, setFavorite] = useState<boolean>(false);
  const param = useParams();

  // 获取数据
  const getData = async () => {
    const user = await userAPI.userInfo();
    if (user.stat === "OK") {
      setUser(user.data);
      const isFav = await jobAPI.findFavorite(param._id!);
      if (isFav.result) {
        setFavorite(isFav.result);
      }
    }
    const jobInfo = await jobAPI.jobDetail(param.id!);
    setJob(jobInfo.data);
    const arrdess = await jobAPI.location(mapKey, jobInfo.data.location);
    setLocation(arrdess.data.geocodes[0].location);
  };

  // 收藏、取消
  const handleFavorite = async () => {
    if (!user) {
      Toast("请先登录");
    } else {
      const result = await jobAPI.doFavorite(isFavorite, param.id!);
      setFavorite(result.result);
      Toast(result.result ? "已收藏" : "已取消");
    }
  };

  useEffect(() => {
    getData();
  }, [param, isFavorite]);
  return (
    <div className={style.back}>
      <Header select="jobs" user={user}></Header>
      <div className={style.main}>
        <div className={style.title}>
          <div className={style.jobName}>{job?.positionName}</div>
          <div className={style.time}>{job?.updatedAt}</div>
          <div className={style.bottom}>
            <div className={style.limit}>
              <div className={style.salary}>
                {job?.salary.min + "-" + job?.salary.max}K
              </div>
              <div className={style.limitIn}>
                {job?.city}
                <span className={style.vline}></span>
                {Enum.toYear(job?.workYear)}
                <span className={style.vline}></span>
                {Enum.toEducation(job?.education)}
              </div>
            </div>
            <div className={style.button}>
              <Button className={style.small} onClick={handleFavorite}>
                {isFavorite ? "已收藏 √" : "收藏"}
              </Button>
              <Button className={style.big} type="primary">
                申请职位
              </Button>
            </div>
          </div>
        </div>
        <div className={style.detail}>
          <div className={style.left}>
            <div className={style.text}>职位描述</div>
            <div className={style.describe}>{job?.describe}</div>
            <div className={style.text}>公司描述</div>
            <div className={style.describe}>{job?.companys[0].describe}</div>
            <div className={style.text}>工作地点</div>
            <div className={style.shadow}>
              <div className={style.address}>
                <IconFont className={style.icon} type="icon-dingwei" />
                {job?.location}
              </div>
              <div style={{ width: "100%", height: "230px" }}>
                <Map
                  amapkey={mapKey}
                  zoom={15}
                  center={[
                    Number(location.split(",")[0]),
                    Number(location.split(",")[1]),
                  ]}
                >
                  <Marker></Marker>
                </Map>
              </div>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.container}>
              <div className={style.text}>职位发布者</div>
              <div className={style.first}>
                <img
                  className={style.img}
                  src="https://img.bosszhipin.com/boss/avatar/avatar_3.png?x-oss-process=image/resize,w_100,limit_0"
                  alt=""
                />
                <span className={style.name}>{job?.users[0].name}</span>
              </div>
            </div>
            <div className={style.container}>
              <div className={style.text}>公司信息</div>
              <div>
                <div className={style.second}>
                  <img
                    src={job?.companys[0].logo}
                    className={style.logo}
                    alt=""
                  />
                  <Link
                    className={style.link}
                    to={"/companyDetail/" + job?.companys[0]._id}
                  >
                    {job?.companys[0].companyShortName}
                  </Link>
                </div>
                <p className={style.p}>
                  <IconFont className={style.icon} type="icon-gupiao" />
                  {Enum.toFinance(job?.companys[0].financeStage)}
                </p>
                <p className={style.p}>
                  <IconFont className={style.icon} type="icon-people" />
                  {Enum.toSize(job?.companys[0].companySize)}
                </p>
                <p className={style.p}>
                  <IconFont className={style.icon} type="icon-fenlei" />
                  {job?.companys[0].industryField}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
