import { Rating, TextField } from "@mui/material";
import { useState } from "react";
import { text } from "stream/consumers";
import dummy from "../../db/data.json";
import styles from "./SubjectComment.module.css";
import CommentEdit from "./SubjectCommentEdit";
import Graph from "../graph/Graph";

interface intraId {
  intraId: String;
}

export default function SubjectComment({ intraId }: intraId) {
  const data = dummy.comments;
  const id = `him`;
  const [isCommentEdit, setIsCommentEdit] = useState<Boolean>(false);

  const clickEditButton = (text?: string, comment_id?: number) => {
    console.log(isCommentEdit);
    if (isCommentEdit) {
      setIsCommentEdit(false);
    } else {
      setIsCommentEdit(true);
    }
  };
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
          <div className={styles.graph}>
            <Graph
              time_taken={data.time_taken}
              amount_study={data.amount_study}
              difficulty={data.difficulty}
            />
          </div>
          <div className={styles.score2}>
            <div className={styles.comment}>
              <div>
                {/* {data.intraid === id ? <button >수정</button> : 123} */}
              </div>
              <div>
                {data.intraid} :
                {id === data.intraid ? (
                  isCommentEdit ? (
                    <div>
                      <TextField
                        id="outlined-multiline-static"
                        label="후기"
                        multiline
                        defaultValue={data.content}
                        rows={4}
                        placeholder="과제에 대한 후기를 남겨주세요."
                        style={{ width: "100%", height: "120px" }}
                        // onChange={(e) => setContent(e.target.value)}
                      />
                      <button
                        onClick={() => clickEditButton(data.content, data.id)}
                      >
                        수정완료
                      </button>
                    </div>
                  ) : (
                    <div>
                      {data.content}{" "}
                      <button
                        onClick={() => clickEditButton(data.content, data.id)}
                      >
                        수정
                      </button>
                    </div>
                  )
                ) : (
                  <div>{data.content} </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
