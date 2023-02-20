import { Rating } from "@mui/material";
import dummy from "../../db/data.json";
import styles from "./SubjectComment.module.css";
import CommentEdit from "./SubjectCommentEdit";

interface intraId {
  intraId: String;
}

export default function SubjectComment({ intraId }: intraId) {
  const data = dummy.comments;
  const id = `him`;
  return (
    <div className={styles.subjectComment}>
      {data.map((data, index) => (
        <div className={styles.commentId} key={index}>
          <div className={styles.commentHeader}>
            <Rating name="read-only" value={data.rated} readOnly />
            <div className={styles.commentTime}>{data.comment_time}</div>
          </div>
          <div className={styles.score2}>
            <div className={styles.score}>
              <div className={styles.scoreTitle}>시간</div>
              <div className={styles.scoreContent}>{data.time_taken}</div>
            </div>
            <div className={styles.score}>
              <div className={styles.scoreTitle}>학습량</div>
              <div className={styles.scoreContent}>{data.amount_study}</div>
            </div>
            <div className={styles.score}>
              <div className={styles.scoreTitle}>난이도</div>
              <div className={styles.scoreContent}>{data.difficulty}</div>
            </div>
            <div className={styles.score}>
              <div className={styles.scoreTitle}>보너스</div>
              <div className={styles.scoreContent}>{data.bonus}</div>
            </div>
          </div>
          <div className={styles.score2}>
            <div className={styles.comment}>
              <div>{data.intraid === id ? <button>수정</button> : 123}</div>
              <div>
                {data.intraid} : {data.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
