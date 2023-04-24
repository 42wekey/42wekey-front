import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { profileState } from "./utils/recoil/user";
import Main from "./components/Main";
import Login from "./components/login/Login";
import MyComment from "./components/myPage/MyPage";
import SubjectDetail from "./components/subject_detail/SubjectDetail";
import IsLogged from "./components/login/IsLogged";
import Modal from "./components/modal/Modal";
import Empty from "./components/Error/Empty";
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import LoginCheck from "./components/login/LoginCheck";



const App = () => {
  // const navigate = useNavigate();
  const baseUrl = `${process.env.REACT_APP_END_POINT}`;
  // const [isLogged, setIsLogged] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(profileState);
  // const url = new URL(window.location.href);
  // const href = url.href;
  // const accessToken = href.split("token=")[1];
  // useEffect(() => { 
  //   if (accessToken) {
  //     localStorage.setItem("42ence-token", accessToken);
  //     setUserInfo({isLogin:true});
  //     console.log(userInfo.isLogin)
  //     navigate('/');
  //     // redirect(`${baseUrl}`);
  //   }
  //   else if (localStorage.getItem("42ence-token")) {
  //     setUserInfo({isLogin:true});
  //     console.log(userInfo.isLogin)
  //     navigate('/');
  //     redirect(`${baseUrl}`);
  //   }
  //   else if (isLogged) {
  //     fetch(`${baseUrl}/user/me`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("42ence-token")}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setUserInfo(data));
  //       console.log(userInfo.intraId);
  //   }
  //   else {
  //     setUserInfo({isLogin:false});
      
  //   }
  //   navigate('/login');
  //   redirect(`/login`);
  // }, [userInfo.isLogin]);
  // useEffect(()=> {
  //   if (localStorage.getItem("42ence-token"))
  //   {fetch(`${baseUrl}/user/me`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("42ence-token")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setUserInfo(data));
  //     console.log(userInfo.intraId);
  // }},[userInfo.isLogin])

  // userInfo.isLogin === false ? <Login /> : 
  // const url = new URL(window.location.href);
  // const href = url.href;
  // const accessToken = href.split("token=")[1];
  useEffect(()=>{
        fetch(`${baseUrl}/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("42ence-token")}`,
        }
      })
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
        console.log(userInfo.level)
    }
  ,[])


  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<LoginCheck />} />
          <Route path="/main" element={<Main />} />
          {/* <Route path="subjectList" element={<Main />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/:circle/:sbj_name" element={<SubjectDetail />} />
          <Route path="/profile/:intraId" element={<MyComment />} />
          <Route path="/*" element={<Empty />} />
        </Routes>
      </Router>
      <Modal />
    </>
  );
};

export default App;
