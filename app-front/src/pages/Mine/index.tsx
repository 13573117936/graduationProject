import React, { useState, useEffect } from "react";
import * as userAPI from "../../services/user.service";
import { IUser } from "../../types";
import style from "./style.module.css";
import "antd/dist/antd.css";
import Header from "../../components/Header";
import { Layout, Menu } from "antd";

const { Content, Sider } = Layout;

// 基本信息、我的简历、我的收藏、投递记录、账号设置

export default function Mine() {
  const [user, setUser] = useState<IUser | null>(null);
  const getData = async function () {
    const userInfo = await userAPI.userInfo();
    setUser(userInfo.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout className={style.back}>
      <Header select=" " user={user} />
      <Layout>
        <Sider className={style.siteLayout}>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", textAlign: "center", paddingTop: "20px" }}
          >
            <Menu.Item style={{ padding: "0" }}>基本信息</Menu.Item>
            <Menu.Item style={{ padding: "0" }}>我的收藏</Menu.Item>
            <Menu.Item style={{ padding: "0" }}>我的简历</Menu.Item>
            <Menu.Item style={{ padding: "0" }}>投递记录</Menu.Item>
            <Menu.Item style={{ padding: "0" }}>账号设置</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "24px 124px", backgroundColor: "#fff" }}>
          <Content className={style.content}>
            <div>hello</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
