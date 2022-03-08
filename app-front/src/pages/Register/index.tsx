import react, { useEffect, useState, useCallback } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import IconFont from "../../assets/icon";
import * as userAPI from "../../services/user.service";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  async function submit() {
    // 登录API
    const loginRes = await userAPI.login(username, password, role);
  }

  useEffect(() => {}, []);

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
            {role === "employer" ? "发现职场牛人" : "投递简历及时沟通"}
          </div>
          <div className={style.item}>
            <IconFont className={style.icon} type="icon-lingdai" />
            {role === "employer" ? "人才搜寻宝库" : "各种职位任你挑选"}
          </div>
        </div>
        <div className={style.right}>
          <Form
            className={style.form}
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item name="role">
              <span
                className={role === "employee" ? style.active : style.nav}
                onClick={() => {
                  setRole("employee");
                }}
              >
                我要找工作
              </span>
              <span
                className={role === "employee" ? style.nav : style.active}
                style={{ left: "-50%" }}
                onClick={() => {
                  setRole("employer");
                }}
              >
                我要招聘
              </span>
            </Form.Item>

            <Form.Item
              labelAlign="right"
              label="手机号"
              name="username"
              rules={[
                { required: true, message: "请输入手机号!" },
                {
                  pattern: /^[1]([3-9])[0-9]{9}$/,
                  message: "格式错误!",
                },
              ]}
              style={{ marginBottom: "40px" }}
            >
              <Input
                onChange={(event: any) => setUsername(event.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              extra="至少六位数字或字母组成"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
                {
                  pattern: /^[a-zA-Z0-9]{6,}$/,
                  message: "格式错误!",
                },
              ]}
            >
              <Input.Password
                onChange={(event: any) => setPassword(event.target.value)}
              />
            </Form.Item>

            <Form.Item
              labelAlign="right"
              label="确认密码"
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: "请确认密码!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次密码不一致"));
                  },
                }),
              ]}
              className={style.formItem}
            >
              <Input.Password
                onChange={(event: any) => setPassword(event.target.value)}
              />
            </Form.Item>

            <Form.Item className={style.formItem} name="button">
              <Button
                className={style.submit}
                onClick={submit}
                type="primary"
                htmlType="submit"
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
