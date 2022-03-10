import React from "react";
import { Link } from "react-router-dom";
import { IJob } from "../../types";
import style from "./style.module.css";
import * as Enum from '../../assets/enum'
interface Props {
  item: IJob;
}

export default function JobItem(props: Props) {
  return (
    <div className={style.item}>
      <Link to={"/main"} className={style.job}>
        <div className={style.subTop}>
          <p className={style.positionName}>{props.item.positionName}</p>
          <p className={style.salary}>
            {props.item.salary.min}-{props.item.salary.max}K
          </p>
        </div>
        <p className={style.subBottom}>
          {props.item.city}
          <span className={style.vline}></span>
          {Enum.toYear(props.item.workYear) }
          <span className={style.vline}></span>
          {Enum.toEducation(props.item.education) }
        </p>
      </Link>

      <Link to={"main"} className={style.company}>
        <img src={props.item.companys[0].logo} alt="" />
        <span className={style.companyName}>
          {props.item.companys[0].companyShortName}
        </span>
        <span className={style.type}>
          { props.item.companys[0].industryField}
        </span>
        <span className={style.vline}></span>
        <span className={style.level}>
          {Enum.toFinance(props.item.companys[0].financeStage)}
        </span>
      </Link>
    </div>
  );
}
