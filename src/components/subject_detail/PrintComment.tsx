import { useState } from "react";
import styles from "./SubjectComment.module.css";
import { Rating, TextField } from "@mui/material";
import Graph from "./graph/Graph";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface intraId {
  intraId: String;
}

interface comment {
  id: number;
  like: number;
  intraid: string;
  sbj_name: string;
  content: string;
  star_rating: number;
  time_taken: string;
  isComment: Boolean;
  difficulty: string;
  bonus: string;
  amount_study: string;
  comment_time: string;
}

interface CommentProps {
  commentData: comment;
  //   clickEditButton: () => void
}

const PrintComment = (props: CommentProps) => {
  const { commentData } = props;
  const [userState, setProfileState] = useRecoilState(profileState);
  const [isLike, setIsLike] = useState<Boolean>();
  const [isCommentEdit, setIsCommentEdit] = useState<Boolean>(false);
  const [content, setContent] = useState<String>();
  const [isComment, setIsComment] = useState(commentData.isComment);

  const clickEditButton = (text?: string, comment_id?: number) => {
    if (isCommentEdit) {
      fetch(`${baseUrl}/comments/${comment_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      setContent(content);
      setIsCommentEdit(false);
    } else {
      setIsCommentEdit(true);
    }
  };

  const clickLikeButton = (commentId?: Number, intraId?: String) => {
    fetch(`${baseUrl}/like.${commentId}/${intraId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setIsLike(!isLike);
    console.log(commentId, intraId);	
  };

  return (
    <div>
      <div className={styles.commentHeader}>
        <button
          className={isLike ? styles.redButton : styles.emptyButton}
          onClick={() => clickLikeButton(commentData.id, userState.intraId)}
        >
          <FavoriteIcon className={styles.heart} />
        </button>
        {commentData.like}
        <Rating name="read-only" value={commentData.star_rating} readOnly />
        <div className={styles.commentTime}>{commentData.comment_time}</div>
      </div>
      <div className={styles.graph}>
        <Graph
          time_taken={commentData.time_taken}
          amount_study={commentData.amount_study}
          difficulty={commentData.difficulty}
        />
      </div>
      <div className={styles.score2}>
        <div className={styles.comment}>
          <div>
            {/* {data.intraid === id ? <button >수정</button> : 123} */}
          </div>
          <div>
            {commentData.intraid} :
            {userState.intraId === commentData.intraid ? (
              isCommentEdit ? (
                <div>
                  <TextField
                    id="outlined-multiline-static"
                    label="후기"
                    multiline
                    defaultValue={commentData.content}
                    rows={4}
                    placeholder="과제에 대한 후기를 남겨주세요."
                    style={{ width: "100%", height: "120px" }}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      clickEditButton(commentData.content, commentData.id)
                    }
                  >
                    수정완료
                  </button>
                </div>
              ) : (
                <div>
                  {commentData.content}{" "}
                  <button
                    onClick={() =>
                      clickEditButton(commentData.content, commentData.id)
                    }
                  >
                    수정
                  </button>
                </div>
              )
            ) : (
              <div>{commentData.content} </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintComment;
