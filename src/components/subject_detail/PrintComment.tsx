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

export interface Comment {
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

export interface CommentProps {
  comment: Comment;
}

const PrintComment = ({ comment }: CommentProps) => {
  const [userState, setProfileState] = useRecoilState(profileState);
  const [isLike, setIsLike] = useState<Boolean>();
  const [isCommentEdit, setIsCommentEdit] = useState<Boolean>(false);
  const [content, setContent] = useState<String>();
  const [isComment, setIsComment] = useState(comment.isComment);

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
      <div>
        {comment.intraid}
        레벨 들어올 수 있나요?
      </div>
      <div>
        <Rating name="read-only" value={comment.star_rating} readOnly />
        <div className={styles.commentTime}>{comment.comment_time}</div>
      </div>
      <div>
        {userState?.intraId === comment?.intraid ? (
          isCommentEdit ? (
            <div>
              <TextField
                id="outlined-multiline-static"
                label="후기"
                multiline
                defaultValue={comment.content}
                rows={4}
                placeholder="과제에 대한 후기를 남겨주세요."
                style={{ width: "100%", height: "120px" }}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                onClick={() => clickEditButton(comment.content, comment.id)}
              >
                수정완료
              </button>
            </div>
          ) : (
            <div>
              {comment.content}{" "}
              <button
                onClick={() => clickEditButton(comment.content, comment.id)}
              >
                수정
              </button>
            </div>
          )
        ) : (
          <div>{comment.content}</div>
        )}
      </div>
      <div>
        <button
          className={isLike ? styles.redButton : styles.emptyButton}
          onClick={() => clickLikeButton(comment.id, userState.intraId)}
        >
          <FavoriteIcon className={styles.heart} />
        </button>
        {comment.like}
      </div>
    </div>
  );
};

export default PrintComment;
