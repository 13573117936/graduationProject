import { Button, Menu, Dropdown } from "antd";
import react from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import IconFont from "../../assets/icon";
import { IUser } from "../../types";
const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/me">个人主页</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/resume">我的简历</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/">切换账号</Link>
    </Menu.Item>
  </Menu>
);
interface Props {
  user: IUser | null;
  select: string;
}
export default function Header(props: Props) {
  const navigate = useNavigate();

  return (
    <div className={style.wrap}>
      <Link to="/main" className={style.logo}>
        易聘网
      </Link>

      <Menu
        className={style.menu}
        selectedKeys={[props.select]}
        mode="horizontal"
      >
        <Menu.Item key="main">
          <Link to="/main">首页</Link>
        </Menu.Item>
        <Menu.Item key="jobs">
          <Link to="/jobs/value=">职位</Link>
        </Menu.Item>
        <Menu.Item key="companys">
          <Link to="/companys/value=">公司</Link>
        </Menu.Item>
      </Menu>
      <div className={props.user ? style.right : style.none}>
        <span>{props.user?.name}</span>
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <IconFont type="icon-gerenzhongxin" className={style.icon} />
        </Dropdown>
      </div>

      <div className={props.user ? style.none : style.right}>
        <Button className={style.button} onClick={() => navigate("/register")}>
          注册
        </Button>
        <Button className={style.button} onClick={() => navigate("/")}>
          登录
        </Button>
      </div>
    </div>
  );
}
