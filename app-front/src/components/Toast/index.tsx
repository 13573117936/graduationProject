import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import styles from "./style.module.css";

function Toast(props: PropsWithChildren<{}>) {
  return (
    <div className={styles.wrap}>
      <div className={styles.box}>{props.children}</div>
    </div>
  );
}

export default function show(text: string, duration = 2000) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  ReactDOM.render(<Toast>{text}</Toast>, el);
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(el);
    document.body.removeChild(el);
  }, duration);
}
