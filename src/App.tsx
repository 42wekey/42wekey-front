import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import SubjectDetail from './components/subject_detail/SubjectDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="subjectList" element={<Main />} /> */}
      <Route path="/:circle/:sbj_name" element={<SubjectDetail/>} />
    </Routes>
  );
};

export default App;
