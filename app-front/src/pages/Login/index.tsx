import react, { useEffect, useState, useCallback } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import IconFont from "../../assets/icon";
import * as userAPI from "../../services/user.service";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  async function submit() {
    // 登录API
    const loginRes = await userAPI.login(username, password, role);
  }

  useEffect(()=>{
    
  },[])

  return (
    <div className={style.wrap}>
      <div className={style.login}>
        <div className={style.left}>
          <div className={style.item}>
            <IconFont className={style.icon} type="icon-songmenhuwangzhan" />
            <Link to="/main">进入官网 {">"}</Link>
          </div>
          <div className={style.item}>
            <IconFont className={style.icon} type="icon-xiaoxi" />
            {role === "employee" ? "发现职场牛人" : "投递简历及时沟通"}
          </div>
          <div className={style.item}>
            <IconFont className={style.icon} type="icon-lingdai" />
            {role === "employee" ? "人才搜寻宝库" : "各种职位任你挑选"}
          </div>
        </div>
        <div className={style.right}>
          <div className={style.font}>登录</div>

          <Form
            className={style.form}
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item>
              <span
                className={role === "employee" ? style.active : style.nav}
                onClick={() => {
                  setRole("employee");
                }}
              >
                我要应聘
              </span>
              <span
                className={role === "employee" ? style.nav : style.active}
                style={{ left: "-50%" }}
                onClick={() => {
                  setRole("employer");
                }}
              >
                我要招人
              </span>
            </Form.Item>

            <Form.Item
              label="账号"
              name="username"
              rules={[{ message: "请输入账号!" }]}
            >
              <Input
                onChange={(event: any) => setUsername(event.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ message: "请输入密码!" }]}
            >
              <Input.Password
                onChange={(event: any) => setPassword(event.target.value)}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox className={style.checkBox}>记住我</Checkbox>
              <Link to="/">忘记密码？</Link>
            </Form.Item>

            <Form.Item>
              <Button className={style.button}>去注册 {">"}</Button>
              <Button
                className={style.submit}
                onClick={submit}
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
