import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import Main from './components/Main';
import Login from "./components/login/Login";
import MyComment from "./components/myComment/MyComment";
import SubjectDetail from './components/subject_detail/SubjectDetail';
import IsLogged from "./components/login/IsLogged";
import Empty from "./components/Error/Empty";

const App = () => {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <RecoilRoot>
    <Router>
    <Routes>
      <Route path="/" element={isLogged===false?<Login />:<Main />} />
      {/* <Route path="subjectList" element={<Main />} /> */}
      <Route path="login" element={<IsLogged/>} />
      <Route path="/:circle/:sbj_name" element={<SubjectDetail/>} />
      <Route path="/allComment/:intraId" element={<MyComment/>} />
      <Route path="/*" element={<Empty/>} />
    </Routes>
    </Router>
    </RecoilRoot>
  );
};

export default App;
