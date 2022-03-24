import React from "react";
import { Link } from "react-router-dom";
import { ICompany } from "../../types";
import style from "./style.module.css";
import * as Enum from "../../assets/enum";

interface Props {
  item: ICompany;
}

export default function CompanyItem(props: Props) {
  return (
    <Link to={"/main"} className={style.job}>
      <div className={style.item}>
        <img src={props.item.logo} alt="" className={style.img} />
        <div className={style.name}>
          <h4 className={style.companyName}>{props.item.companyShortName}</h4>
          <div className={style.status}>
            {Enum.toFinance(props.item.financeStage)}
            <span className={style.vline}></span>
            {props.item.industryField}
          </div>
        </div>
      </div>
    </Link>
  );
}
