import { Button, Menu, Dropdown } from "antd";
import react from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import IconFont from "../../assets/icon";
import { IUser } from "../../types";
const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/me">个人主页</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/login">切换账号</Link>
    </Menu.Item>
  </Menu>
);
interface Props {
  user: IUser | null;
}
export default function Header(props: Props) {
  return (
    <div className={style.wrap}>
      <Link to="/main" className={style.logo}>
        易聘网
      </Link>

      <Menu className={style.menu} selectedKeys={['main']} mode="horizontal" > 
        <Menu.Item key='main'>
          <Link to="/main">首页</Link>
        </Menu.Item>
        <Menu.Item key='jobs'>
          <Link to="/jobs">职位</Link>
        </Menu.Item>
        <Menu.Item key='companys'>
          <Link to="/companys">公司</Link>
        </Menu.Item>
      </Menu>
      <Dropdown
        overlay={menu}
        placement="bottomCenter"
        arrow
        className={props.user ? "" : style.none}
      >
        <IconFont type="icon-chilun--" className={style.icon} />
      </Dropdown>
      <div className={props.user ? style.none : style.right}>
        <Button className={style.button}>注册</Button>
        <Button className={style.button}>登录</Button>
      </div>
    </div>
  );
}
