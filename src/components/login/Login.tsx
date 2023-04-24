import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ClassNames } from "@emotion/react";
import styles from "./Login.module.css";
import { ReactComponent as Wekey42 } from "../42wekey.svg";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const baseUrl = `${process.env.REACT_APP_END_POINT}`;
  const loginUrl = `${baseUrl}/oauth2/authorization`;
  const [userInfo, setUserInfo] = useRecoilState(profileState);
  useEffect(()=> {
    if (localStorage.getItem("42ence-token")) {
      setUserInfo({ isLogin: true });
      navigate('/main');
    }
  },[])

  return (
    <div className={styles.container}>
        
        <Wekey42 className={styles.logo} />
        <a href={loginUrl} className={styles.loginBtn}>
          로그인
          
        </a>
    </div>
  );
}

// const url = new URL(window.location.href);
// const href = url.href;
// const accessToken = href.split("token=")[1];
// useEffect(() => {
//   if (accessToken) {
//     localStorage.setItem("42ence-token", accessToken);
//     setUserInfo({isLogin:true});
//     console.log(userInfo.isLogin)
//     redirect(`${baseUrl}`);
//   }
//   if (localStorage.getItem("42ence-token")) {
//     setUserInfo({isLogin:true});
//     console.log(userInfo.isLogin)
//     redirect(`${baseUrl}`);
//   }
//   setUserInfo({isLogin:false});
//   if (isLogged) {
//     fetch(`${baseUrl}/user/me`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("42ence-token")}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setUserInfo(data));
//       console.log(userInfo.intraId);
//   }
// }, [userInfo.isLogin]);
// useEffect(()=> {
//   console.log(userInfo.isLogin)
// },[userInfo.isLogin])
