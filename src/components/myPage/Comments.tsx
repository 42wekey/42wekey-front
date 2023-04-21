import { useState, useEffect } from "react";
import styles_star from "./Comments.module.css";
import styles from "../subject_detail/SubjectComment.module.css";
import {
  convertTimeTaken,
  convertDifficulty,
  convertAmountStudy,
  convertBonus,
  Comment,
} from "../subject_detail/PrintComment";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";
import { ReactComponent as EmptyStar } from "../../emptyStar.svg";

export interface CommentProps {
  comment: Comment;
  isLikeComment: boolean;
}

interface Star {
  star_rating: number;
}

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface intraId {
  intraId: String;
}

export function StarRating({ star_rating }: Star) {
  return (
    <>
      <EmptyStar
        fill={star_rating > 0 ? "#FEDB22" : "#F9F9F9"}
        stroke={star_rating > 0 ? "#FEDB22" : "#E8E8E8"}
        className={styles_star.star}
      />
      <EmptyStar
        fill={star_rating > 1 ? "#FEDB22" : "#F9F9F9"}
        stroke={star_rating > 1 ? "#FEDB22" : "#E8E8E8"}
        className={styles_star.star}
      />
      <EmptyStar
        fill={star_rating > 2 ? "#FEDB22" : "#F9F9F9"}
        stroke={star_rating > 2 ? "#FEDB22" : "#E8E8E8"}
        className={styles_star.star}
      />
      <EmptyStar
        fill={star_rating > 3 ? "#FEDB22" : "#F9F9F9"}
        stroke={star_rating > 3 ? "#FEDB22" : "#E8E8E8"}
        className={styles_star.star}
      />
      <EmptyStar
        fill={star_rating > 4 ? "#FEDB22" : "#F9F9F9"}
        stroke={star_rating > 4 ? "#FEDB22" : "#E8E8E8"}
        className={styles_star.star}
      />
    </>
  );
}

const Comments = ({ comment, isLikeComment }: CommentProps) => {
  const [userState, setProfileState] = useRecoilState(profileState);
  const [isLike, setIsLike] = useState<Boolean>();

  const clickLikeButton = (commentId?: Number, intraId?: String) => {
    fetch(`${baseUrl}/like.${commentId}/${intraId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setIsLike((isLike) => !isLike);
  };

  return (
    <div>
      <div className={styles.commentUser}>{comment.subject_name}</div>
      <div className={styles_star.star_container}>
        <StarRating star_rating={comment.star_rating} />
        <div className={styles_star.star_font}>
          <span className={styles_star.star_rating}>{comment.star_rating}</span>
          <span className={styles_star.divide}>|</span>
          {isLikeComment && (
            <span className={styles_star.star_rating}>{comment.intra_id}</span>
          )}
          {isLikeComment && <span className={styles_star.divide}>|</span>}
          <span className={styles.commentTime}>{comment.update_time}</span>
        </div>
      </div>
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
      <div className={styles.commentContent}>{comment.content}</div>
    </div>
  );
};
export default Comments;
