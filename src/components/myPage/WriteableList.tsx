import styles from "./WriteableList.module.css";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";
import { Link } from "react-router-dom";

interface Subject {
  subject_name: string;
  circle: number;
}

interface SubjectList {
  subject: Subject[];
  intra_id: string|undefined;
}

export default function WriteableList({ subject, intra_id }: SubjectList) {
  const [userState, setProfileState] = useRecoilState(profileState);

  return (
    <div>
      {subject.map((data, index) => (
        <div key={index} className={styles.container}>
          <div className={styles.sbj}>{data.subject_name}</div>
          {userState.intraId === intra_id &&
            <Link
              to={`/${data.circle}_circle/${data.subject_name}`}
              className={styles.badge}
            >
              리뷰쓰기
            </Link>
          }
        </div>
      ))}
    </div>
  );
}
