import { useState, useEffect } from "react";
import styles from "../subject_detail/SubjectComment.module.css";
import {
  convertTimeTaken,
  convertDifficulty,
  convertAmountStudy,
  convertBonus,
  Comment,
  CommentProps,
} from "../subject_detail/PrintComment";
import { Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface intraId {
  intraId: String;
}

const LikeComments = ({ comment }: CommentProps) => {
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
      <div className={styles.commentUser}>
        {comment.intra_id}
        <span className={styles.commentUserBadge}>
          레벨{comment.user_level}
        </span>
      </div>
      <div>
        <Rating name="read-only" value={comment.star_rating} readOnly />|
        <span className={styles.commentTime}>{comment.update_time}</span>
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
export default LikeComments;
