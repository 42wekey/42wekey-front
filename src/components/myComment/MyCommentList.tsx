import { Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./MyCommentList.module.css";
import Graph from "../subject_detail/graph/Graph";
import { profileState } from "../../utils/recoil/user";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";

export interface myComment {
  subjectName: string;
  userLevel: number;
  intraId: string;
  circle: number;
  commentId: number;
  comment_time: string;
  content: string;
  star_rating: number;
  time_taken: string;
  amount_study: string;
  bonus: string;
  difficulty: string;
}

export default function MyCommentList() {
  const [userState, setProfileState] = useRecoilState(profileState);
  const id = `him`;
  const [isCommentEdit, setIsCommentEdit] = useState<Boolean>(false);
  const [content, setContent] = useState<String>();
  const [myComment, setMyComment] = useState<myComment[]>([]);
  useEffect(() => {
    fetch(`http://localhost:3001/myComment`)
      .then((res) => res.json())
      .then((data) => setMyComment(data));
  }, []);

  const clickEditButton = (text?: string, comment_id?: number) => {
    console.log(comment_id);
    if (isCommentEdit) {
      fetch(`http://localhost:3001/subject/comment/edit/${comment_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      setIsCommentEdit(false);
    } else {
      setIsCommentEdit(true);
    }
  };
  return (
    <div className={styles.subjectComment}>
      {myComment.map((data, index) => (
        <div className={styles.commentId} key={index}>
          <Link to={`/${data.circle}_circle/${data.subjectName}`}>
            {data.circle} circle - {data.subjectName}
          </Link>
          <div className={styles.commentHeader}>
            <Rating name="read-only" value={data.star_rating} readOnly />
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
                {data.intraId} Lv.{data.userLevel} :
                {id === data.intraId ? (
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
                        onChange={(e) => setContent(e.target.value)}
                      />
                      <button
                        onClick={() =>
                          clickEditButton(data.content, data.commentId)
                        }
                      >
                        수정완료
                      </button>
                    </div>
                  ) : (
                    <div>
                      {data.content}{" "}
                      <button
                        onClick={() =>
                          clickEditButton(data.content, data.commentId)
                        }
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
