import { Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./SubjectComment.module.css";
import Graph from "./graph/Graph";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PrintComment from "./PrintComment";

interface intraId {
  intraId: String;
}

interface comment {
  id: number,
  like: number,
  intraid: string,
  sbj_name: string,
  content: string,
  star_rating: number,
  time_taken: string,
  difficulty: string,
  isComment: Boolean;
  bonus: string,
  amount_study: string,
  comment_time: string
}

export default function SubjectComment() {
  const id = `him`;
  const [isCommentEdit, setIsCommentEdit] = useState<Boolean>(false);
  const [content, setContent] = useState<String>();
  const [comment, setComment] = useState<comment[]>([]);
  const [isLike, setIsLike] = useState<Boolean>(false);
    

  useEffect(() => {
    fetch(`http://localhost:3001/comments`)
      .then((res) => res.json())
      .then((data) => setComment(data));
  }, []);

  return (
    <div className={styles.subjectComment}>
      {comment.map((data, index) => ( 
        <div className={styles.commentId} key={index}>
          <PrintComment commentData={data}/>
          {/* <div className={styles.commentHeader}>
            <button className={isLike ? styles.redButton : styles.emptyButton} onClick={()=>setIsLike(!isLike)}><FavoriteIcon className={styles.heart}/></button>
            {data.like}
            <Rating name="read-only" value={data.star_rating} readOnly />
            <div className={styles.commentTime}>{data.comment_time}</div>
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
                {data.intraid === id ? <button >수정</button> : 123}
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
                        onChange={(e) => setContent(e.target.value)}
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
                        // onClick={() => clickEditButton(data.content, data.id)}
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
        </div> */}
        </div>
      ))}
    </div>
  );
}
