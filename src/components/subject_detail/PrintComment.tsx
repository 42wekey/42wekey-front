import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./SubjectComment.module.css";
import { Rating, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";
import { modal } from "../../utils/recoil/modal";
import { StarRating } from "../../hooks/StarRating";
import { ReactComponent as Like } from "../../like.svg";
import { instance } from '../../utils/axios';
import { redirect, useNavigate } from "react-router";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface intraId {
  intraId: String;
}

export function convertTimeTaken(input: string): string {
  if (input === "a_week") {
    return "일주일 이내";
  } else if (input === "two_week") {
    return "1~2주 이내";
  } else if (input === "three_week") {
    return "3~4주 이내";
  } else if (input === "a_month") {
    return "한 달 이상";
  } else if (input === "three_month") {
    return "세 달 이상";
  } else {
    return "미정";
  }
}

export function convertDifficulty(input: string): string {
  if (input === "easy") {
    return "쉬워요";
  } else if (input === "normal") {
    return "보통이에요";
  } else if (input === "hard") {
    return "어려워요";
  } else {
    return "difficulty문제임";
  }
}

export function convertAmountStudy(input: string): string {
  if (input === "low") {
    return "적은 편이에요";
  } else if (input === "middle") {
    return "적당해요";
  } else if (input === "high") {
    return "많은 편이에요";
  } else {
    return "미정";
  }
}

export function convertBonus(input: string): string {
  if (input === "no") {
    return "안 했어요";
  } else if (input === "little") {
    return "하긴 했어요";
  } else if (input === "complete") {
    return "다 했어요";
  } else {
    return "미정";
  }
}

export interface Comment {
  comment_id: number;
  like_num: number;
  intra_id: string;
  circle: number;
  user_level: number;
  subject_name: string;
  content: string;
  star_rating: number;
  time_taken: string;
  isComment: boolean;
  difficulty: string;
  bonus: string;
  amount_study: string;
  update_time: string;
}

export interface CommentProps {
  comment: Comment;
  showCommentEdit: boolean;
}

interface TextTrunc {
  text: string;
  max_length: number;
}

const PrintComment = ({ comment, showCommentEdit }: CommentProps) => {
  const [userState, setProfileState] = useRecoilState(profileState);
  const [isLike, setIsLike] = useState<Boolean>();
  const [{ modalName, commentEdit }, setModal] = useRecoilState(modal);
  const [longComment, setLongComment] = useState(false);
  const [showEdit, setShowEdit] = useState<Boolean>(false);
  const [isCommentEdit, setIsCommentEdit] = useState<Boolean>(false);
  const [content, setContent] = useState<String>();
  const navigate = useNavigate();
  const str = comment.content.replace(/(?:\r\n|\r|\n)/g, '\n');

  const text_truncate: React.FC<TextTrunc> = ({ text, max_length }) => {
    const len = text.length;
    const content = len > max_length ? text.slice(0, max_length) + "..." : text;
    return <>{content}</>;
  };

  //const [, showCommentEdit] = useState<undefined | (() => void)>(undefined);

  //useEffect(()=>{
  //  useCallback(() => showCommentEdit(() => {}), []);
  //},[]);

  //const clickEditButton = (text?: string, comment_id?: number) => {
  //  if (isCommentEdit) {
  //    fetch(`${baseUrl}/comments/${comment_id}`, {
  //      method: "PATCH",
  //      headers: { "Content-Type": "application/json" },
  //      body: JSON.stringify({ content }),
  //    });
  //    setContent(content);
  //    setIsCommentEdit((isCommentEdit) => !isCommentEdit);
  //  }
  //};

  const clickLikeButton = (comment_id?: Number, intraId?: String) => {

    //const getLike = async () => {
    //  try{
    //    const res = await instance.get(`/comments/${comment_id}/like`)
    //  }catch(e){
    //    navigate("/error");
    //  }
    //}
    fetch(`${baseUrl}/comments/${comment_id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setIsLike((isLike) => !isLike);
  };

  return (
    <div>
      <div className={styles.commentUser}>
        <div>
          <Link to={`/profile/${comment.intra_id}`} style={{ all: "unset" }}>
            <span>{comment.intra_id}</span>
          </Link>
          <span className={styles.commentUserBadge}>
            레벨{comment.user_level}
          </span>
        </div>
        {showCommentEdit && (
          <span
            className={styles.commentEdditBtn}
            onClick={() => {
              setModal({
                modalName: "commentEdit",
                commentEdit: {
                  subjectName: comment.subject_name,
                  circle: comment.circle,
                  comment: comment,
                },
              });
            }}
          >
            수정하기
          </span>
        )}
      </div>
      <div className={styles.star_container}>
        <StarRating star_rating={comment.star_rating} />
        <div>
          <span className={styles.divide}>|</span>
          <span className={styles.commentTime}>{comment.update_time}</span>
        </div>
      </div>
      {/*<div>
        {userState.intraId === comment.intraid ? (
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
      </div>*/}
      <div className={styles.detailContainer}>
        <div className={styles.detailValue}>
          <span className={styles.detailTitle}>소요시간</span>
          <span className={styles.detailContent}>
            {convertTimeTaken(comment.time_taken)}
          </span>
        </div>
        <div className={styles.detailValue}>
          <span className={styles.detailTitle}>난이도</span>
          <span className={styles.detailContent}>
            {convertAmountStudy(comment.amount_study)}
          </span>
        </div>
        <div className={styles.detailValue}>
          <span className={styles.detailTitle}>학습량</span>
          <span className={styles.detailContent}>
            {convertDifficulty(comment.difficulty)}
          </span>
        </div>
        <div className={styles.detailValue}>
          <span className={styles.detailTitle}>보너스</span>
          <span className={styles.detailContent}>
            {convertBonus(comment.bonus)}
          </span>
        </div>
      </div>
      <div className={styles.commentContent}>
        {str !== undefined && str.length > 300
          ? str.slice(0, 300) + "..."
          : str}
      </div>
      <div className={styles.likeContainer}>
        <button
          className={isLike ? styles.redButton : styles.emptyButton}
          onClick={() => clickLikeButton(comment.comment_id, userState.intra_id)}
        >
          <Like className={styles.heart} />
        </button>
        <span className={styles.heartNum}>{comment.like_num}</span>
      </div>
    </div>
  );
};
export default PrintComment;
