import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Main from './components/Main';
import MyComment from "./components/myComment/myComment";
import SubjectDetail from './components/subject_detail/SubjectDetail';

const App = () => {
  return (

    <RecoilRoot>
    <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="subjectList" element={<Main />} /> */}
      <Route path="/:circle/:sbj_name" element={<SubjectDetail/>} />
      <Route path="/allComment/:intraId" element={<MyComment/>} />
    </Routes>
    </Router>
    </RecoilRoot>
  );
};

export default App;
