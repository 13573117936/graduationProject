import React from "react";
import { Link } from "react-router-dom";
import { IJob } from "../../types";
import style from "./style.module.css";
import * as Enum from "../../assets/enum";
interface Props {
  item: IJob;
  size: string;
}

export default function JobItem(props: Props) {
  if (props.size === "small") {
    return (
      <div className={style.item}>
        <Link to={"/jobDetail/" + props.item._id} className={style.job}>
          <div className={style.subTop}>
            <p className={style.positionName}>{props.item.positionName}</p>
            <p className={style.salary}>
              {props.item.salary.min}-{props.item.salary.max}K
            </p>
          </div>
          <p className={style.subBottom}>
            {props.item.city}
            <span className={style.vline}></span>
            {Enum.toYear(props.item.workYear)}
            <span className={style.vline}></span>
            {Enum.toEducation(props.item.education)}
          </p>
        </Link>

        <Link
          to={"/companyDetail/" + props.item.companyId}
          className={style.company}
        >
          <img src={props.item.companys[0].logo} className={style.img} alt="" />
          <span className={style.companyName}>
            {props.item.companys[0].companyShortName}
          </span>
          <span className={style.type}>
            {props.item.companys[0].industryField}
          </span>
          <span className={style.vline}></span>
          <span className={style.level}>
            {Enum.toFinance(props.item.companys[0].financeStage)}
          </span>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={style.link}>
        <Link to={"/jobDetail/" + props.item._id}>
          <div className={style.bigItem}>
            <div className={style.top}>
              <div className={style.leftInfo}>
                <div className={style.jobTitle}>{props.item.positionName}</div>
                <div className={style.jobLimit}>
                  <span className={style.salary2}>
                    {props.item.salary.min}-{props.item.salary.max}K
                  </span>
                  <p className={style.subBottom2}>
                    {Enum.toYear(props.item.workYear)}
                    <span className={style.vline}></span>
                    {Enum.toEducation(props.item.education)}
                  </p>
                </div>
              </div>
            </div>
            <div className={style.rightInfo}>
              <h3 className={style.companyName2}>
                <Link to={"/companyDetail/" + props.item.companyId}>
                  {props.item.companys[0].companyShortName}
                </Link>
              </h3>
              <div className={style.grayText}>
                {props.item.companys[0].industryField}
                <span className={style.vline}></span>
                {Enum.toFinance(props.item.companys[0].financeStage)}
                <span className={style.vline}></span>
                {Enum.toSize(props.item.companys[0].companySize)}
              </div>
            </div>
            <img
              className={style.img}
              src={props.item.companys[0].logo}
              alt=""
            />
          </div>
          <div className={style.bot}>
            {props.item.keyWords.slice(0, 5).map((item, index) => {
              return (
                <span className={style.keyWord} key={index}>
                  {item}
                </span>
              );
            })}
          </div>
        </Link>
      </div>
    );
  }
}
