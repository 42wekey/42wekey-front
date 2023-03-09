import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import dummy from "../../db/data.json";
import styles from "./SubjectIndexItem.module.css";

export interface PdfIndexItemProps {
  circle: number;
}

export default function PdfIndexItem(props: PdfIndexItemProps) {
  const data = dummy.subjects.filter(
    (subject) => Number(subject.circle) === Number(props.circle)
  );

  return (
    <div>
      {data.map((data) => (
        <div className={styles.sbj} key={data.id}>
          <Link to={`/${data.circle}_circle/${data.sbj_name}`}>
            <div className={styles.title}>{data.sbj_name}</div>
          </Link>
          <Rating name="half-rating-read" value={3.5}  precision={0.1}  readOnly />
        </div>
      ))}
    </div>
  );
}
