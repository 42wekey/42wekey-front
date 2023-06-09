import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";

export default function LoginCheck () {
  const navigate = useNavigate();
  const baseUrl = `${process.env.REACT_APP_END_POINT}`;
  const [isLogged, setIsLogged] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(profileState);
  const url = new URL(window.location.href);
  const href = url.href;
  const accessToken = href.split("token=")[1];
  useEffect(() => { 
    if (accessToken) {
      localStorage.setItem("42ence-token", accessToken);
      setUserInfo({isLogin:true});
      console.log(userInfo.isLogin)
      navigate('/main');
      // redirect(`${baseUrl}`);
    }
    else if (localStorage.getItem("42ence-token")) {
      setUserInfo({isLogin:true});
      console.log(userInfo.isLogin)
      navigate('/main');
      redirect(`${baseUrl}`);
    }
    else if (isLogged) {
      fetch(`${baseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("42ence-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
    }
    else {
      setUserInfo({isLogin:false});
      
    }
    navigate('/login');
    redirect(`/login`);
  }, []);
  useEffect(()=> {
    if (localStorage.getItem("42ence-token"))
    {fetch(`${baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("42ence-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
      console.log(userInfo.intra_id);
  }},[])
  return (<div></div>);
}