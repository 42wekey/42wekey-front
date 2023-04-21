import styles from "./WriteableList.module.css";
import {Link} from "react-router-dom";

interface Subject {
  subject_name: string;
  circle: number;
}

interface SubjectList {
  subject: Subject[];
}

export default function WriteableList({ subject }: SubjectList) {
  return (
    <div>
      {subject.map((data, index) => (
        <div key={index} className={styles.container}>
          <div className={styles.sbj}>{data.subject_name}</div>
          <Link to={`/${data.circle}_circle/${data.subject_name}`} className={styles.badge}>리뷰쓰기</Link>
        </div>
      ))}
    </div>
  );
}
