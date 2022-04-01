import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICompany } from "../../types";
import style from "./style.module.css";
import * as Enum from "../../assets/enum";
import * as companyAPI from "../../services/company.service";

interface Props {
  item: ICompany;
  size: string;
}

export default function CompanyItem(props: Props) {
  const [number, setNumber] = useState<number>(0);
  const getNumber = async () => {
    const num = await companyAPI.number(props.item._id);
    setNumber(num.result);
  };
  useEffect(() => {
    getNumber();
  }, []);

  if (props.size === "small") {
    return (
      <Link to={"/companyDetail/" + props.item._id} className={style.job}>
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
  } else {
    return (
      <Link to={"/companyDetail/" + props.item._id} className={style.back}>
        <div className={style.left}>
          <div>
            <img className={style.img} src={props.item.logo} alt="" />
          </div>
          <div>
            <div className={style.name2}>{props.item.companyShortName}</div>
            <div className={style.limit}>
              {props.item.industryField}
              <span className={style.vline}></span>
              {Enum.toFinance(props.item.financeStage)}
              <span className={style.vline}></span>
              {Enum.toSize(props.item.companySize)}
            </div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.number}>{number}</div>
          <div className={style.text}>在招职位</div>
        </div>
        <div className={style.right}></div>
      </Link>
    );
  }
}
