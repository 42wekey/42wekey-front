import styles from "./SubjectIndex.module.css";
import { useEffect, useState } from "react";
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
    <div className={styles.container}>
      <div className={styles.subjectTitle}>
      과제 전체보기
      </div>
      <div className={styles.subject}>
        {subjectList.map((data, index) => (
          <div className={styles.listTitle} key={index}>
            <a onClick={() => setSelectCircle(index)}>
              <>{data.circle}_circle</>
            </a>
          </div>
        ))}
      </div>
      {selectCircle}Circle
      <div>
        {subjectList[selectCircle]?.subject.map((subject, i) => (
          <div key={i}>
            <Link
              to={`/${selectCircle}_circle/${subject.subject_name}`}
              className={styles.subject}
            >
              {subject.subject_name} - {subject.subject_info}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
