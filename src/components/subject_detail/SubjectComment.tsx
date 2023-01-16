import { Rating } from "@mui/material";
import dummy from "../../db/data.json";
import styles from "./SubjectDetail.module.css";

export default function PdfComment() {
  const data = dummy.comments;
  return (
    <div className={styles.pdfComment}>
      {data.map((data, index) => (
        <div className={styles.commentId} key={index}>
          <Rating name="read-only" value={data.rated} readOnly />
          <div>{data.intraid} :s</div>
          <div>{data.content} :</div>
          <div className={styles.commentTime}>{data.comment_time}</div>
        </div>
      ))}
    </div>
  );
}
