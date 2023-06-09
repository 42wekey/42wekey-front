import { formControlClasses } from "@mui/material";
import { Link } from "react-router-dom";
import AdminCreate from "./AdminCreate";
import AdminList from "./AdminList";
import styles from "./Admin.module.css";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;

export default function Admin() {
  //  const onClick = () => {};
  return (
    <div className={styles.container}>
      <Link to={`/admin/create`}>
        <button className={styles.container && styles.btn}>과제 추가하기</button>
      </Link>
      {/* <AdminList /> */}
    </div>
  );
}
