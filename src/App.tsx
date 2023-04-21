import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import {profileState} from "./utils/recoil/user"
import Main from './components/Main';
import Login from "./components/login/Login";
import MyComment from "./components/myPage/MyPage";
import SubjectDetail from './components/subject_detail/SubjectDetail';
import IsLogged from "./components/login/IsLogged";
import Modal from "./components/modal/Modal";
import Empty from "./components/Error/Empty";

const App = () => {
  const baseUrl = `${process.env.REACT_APP_END_POINT}`;
  const [isLogged, setIsLogged] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(profileState)

  useEffect(() => {
    fetch(`${baseUrl}/user_me`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);

  return (
  <>
    <Router>
    <Routes>
      <Route path="/" element={isLogged===false?<Login />:<Main />} />
      {/* <Route path="subjectList" element={<Main />} /> */}
      <Route path="login" element={<IsLogged/>} />
      <Route path="/:circle/:sbj_name" element={<SubjectDetail/>} />
      <Route path="/profile/:intraId" element={<MyComment/>} />
      <Route path="/*" element={<Empty/>} />
    </Routes>
    </Router>
    <Modal/>
    </>
  );
};

export default App;
