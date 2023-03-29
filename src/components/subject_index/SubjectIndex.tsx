import PdfIndexBox from "./SubjectIndexBox";
import styles from "./SubjectIndex.module.css";
import { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

interface SubjectCircle {
  subject_name: String;
  subject_info: String;
}
interface SubjectList {
  circle: Number;
  subject: SubjectCircle[];
}

export default function PdfIndex() {
  const [circle, setCircle] = useState<Number>(0);
  const [subjectList, setSubjectList] = useState<SubjectList[]>([]);
  const [selectCircle, setSelectCircle] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:3001/subject_list`)
      .then((res) => res.json())
      .then((data) => setSubjectList(data));
  }, []);

  return (
    <div className={styles.test}>
      {/* <ul className={styles.container}>
        {subjectList.map((data, index) => (
          <li className={styles.listTitle} key={index}>
            {data.subject.map((subject, i)=> 
                    <ul>
                        {subject.subject_name} {subject.subject_info}
                    </ul>
                    )}
          </li>
        ))}
      </ul> */}
      과제 전체보기
      <div className={styles.subject}>
      {subjectList.map((data, index) => (
        <div className={styles.listTitle} key={index}>
          <button onClick={() => setSelectCircle(index)}>
            <>{data.circle}_circle</>
          </button>
        </div>
      ))}
      </div>
      {selectCircle}Circle
      <div >
      {subjectList[selectCircle]?.subject.map((subject, i) => (
        <div key={i}>
          <Link to={`/${selectCircle}_circle/${subject.subject_name}`} className={styles.subject}>
            {subject.subject_name} - {subject.subject_info}
          </Link>
        </div>
      ))}
      </div>
    </div>
  );
}
