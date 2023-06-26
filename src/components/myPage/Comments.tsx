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
import { StarRating } from "../../hooks/StarRating";
import Modal from "../modal/Modal";
import { modal } from "../../utils/recoil/modal";
import { ConvertTime } from "../../hooks/ConvertTime";
import { useParams } from "react-router";

export interface CommentProps {
  comment: Comment;
  isLikeComment: boolean;
}

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface intraId {
  intraId: String;
}

const Comments = ({ comment, isLikeComment }: CommentProps) => {
  const [userState, setProfileState] = useRecoilState(profileState);
  const [isLike, setIsLike] = useState<Boolean>();
  const [{ modalName }, setModal] = useRecoilState(modal);
  const params = useParams() as { profile: string; intraId: string };
  const intraId = params.intraId;

  const clickLikeButton = (commentId?: Number, intraId?: String) => {
    fetch(`${baseUrl}/like.${commentId}/${intraId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setIsLike((isLike) => !isLike);
  };

  function getTime(targetTime:string) {
    const time = ConvertTime({title:"", time:targetTime});
    return time;
  }

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
          <span className={styles.commentTime}>{getTime(comment.update_time)}</span>
          {comment.intra_id === userState.intra_id || (isLikeComment === false && intraId === userState.intra_id) ? (
            <button
              style={{"all":"unset"}}
              className={styles.commentEditBtn}
              onClick={() => {
                setModal({
                  modalName: "commentEdit",
                  commentEdit: {
                    subjectName: comment.subject_name,
                    circle: comment.circle,
                    comment: comment
                  },
                });
              }}
            >
              수정하기
            </button>
          ) : null}
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
