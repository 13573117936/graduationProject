import React, { useCallback, useState } from "react";
import style from "./style.module.css";
import { Input, Select } from "antd";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const { Search } = Input;
  const { Option } = Select;
  const navigate = useNavigate();
  const [option, setOption] = useState("职位");
  const [value, setValue] = useState("");

  const onSearch = useCallback(() => {
    console.log(1)
    if (option === "职位") {
      console.log(2)
      navigate("/jobs/value=" + value);
    } else {
      console.log(3)
      navigate("/companys/value=" + value);
    }
  }, [navigate, option, value]);

  return (
    <div className={style.wrap}>
      <Input.Group className={style.group} compact>
        <Select
          onChange={(value) => {
            setOption(value);
            console.log(value);
          }}
          size="large"
          className={style.select}
          defaultValue="职位"
        >
          <Option value="职位">职位</Option>
          <Option value="公司">公司</Option>
        </Select>
        <Search
          onChange={(event) => setValue(event.target.value)}
          className={style.input}
          placeholder="input search text"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={onSearch}
        />
      </Input.Group>
    </div>
  );
}
