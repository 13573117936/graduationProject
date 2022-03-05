import react, { useCallback, useState } from "react";
import style from "./style.module.css";
import { Input, Select } from "antd";

export default function Search() {
  const { Search } = Input;
  const { Option } = Select;
  const [text, setText] = useState("");
  const onSearch = useCallback(() => {}, []);
  const onChange = useCallback((value) => {
    console.log(value);
  }, []);

  return (
    <div className={style.wrap}>
      <Input.Group className={style.group} compact>
        <Select
          onChange={onChange}
          size="large"
          className={style.select}
          defaultValue="职位"
        >
          <Option value="职位">职位</Option>
          <Option value="公司">公司</Option>
        </Select>
        <Search
          onChange={(event) => setText(event.target.value)}
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
