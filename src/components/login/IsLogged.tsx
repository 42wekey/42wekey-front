import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./IsLogged.module.css";
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from "@mui/material/CircularProgress";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;

export default function IsLogged() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    console.log(url);
    const href = url.href;
    if (!href) return;
    const accessToken = href.split("token=")[1];
    if (accessToken == undefined) return;

    fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: accessToken,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("로그인에 성공했습니다.");
        navigate("/");
      }
    });
  }, []);

  return (
    <div className={styles.window}>
      <LinearProgress />
      <div className={styles.loading}>
      <CircularProgress />
      <div className={styles.text}>로딩 중</div>
    </div>
    </div>
    
  );
}
