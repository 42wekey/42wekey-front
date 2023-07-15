import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './SubjectComment.module.css';
import { Rating, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRecoilState } from 'recoil';
import { profileState } from '../../utils/recoil/user';
import { modal } from '../../utils/recoil/modal';
import { StarRating } from '../../hooks/StarRating';
import { ReactComponent as Like } from '../../svg/like.svg';
import { ReactComponent as Like2 } from '../../svg/alreadyLike.svg';
import { instance } from '../../utils/axios';
import { redirect, useNavigate } from 'react-router';

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface intraId {
  intraId: String;
}

export function convertTimeTaken(input: string): string {
  if (input === 'a_week') {
    return '일주일 이내';
  } else if (input === 'two_week') {
    return '1~2주 이내';
  } else if (input === 'three_week') {
    return '3~4주 이내';
  } else if (input === 'a_month') {
    return '한 달 이상';
  } else if (input === 'three_month') {
    return '세 달 이상';
  } else {
    return '미정';
  }
}

export function convertDifficulty(input: string): string {
  if (input === 'easy') {
    return '쉬워요';
  } else if (input === 'normal') {
    return '보통이에요';
  } else if (input === 'hard') {
    return '어려워요';
  } else {
    return 'difficulty문제임';
  }
}

export function convertAmountStudy(input: string): string {
  if (input === 'low') {
    return '적은 편이에요';
  } else if (input === 'middle') {
    return '적당해요';
  } else if (input === 'high') {
    return '많은 편이에요';
  } else {
    return '미정';
  }
}

export function convertBonus(input: string): string {
  if (input === 'no') {
    return '안 했어요';
  } else if (input === 'little') {
    return '하긴 했어요';
  } else if (input === 'complete') {
    return '다 했어요';
  } else {
    return '미정';
  }
}

export interface Comment {
  comment_id: number;
  is_like: boolean;
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
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeNum, setLikeNum] = useState<number>(0);
  const [{ modalName, commentEdit }, setModal] = useRecoilState(modal);
  const navigate = useNavigate();
  const oriLike = comment.like_num;
  const str = comment.content.replace(/(?:\r\n|\r|\n)/g, '\n');

  const text_truncate: React.FC<TextTrunc> = ({ text, max_length }) => {
    const len = text.length;
    const content = len > max_length ? text.slice(0, max_length) + '...' : text;
    return <>{content}</>;
  };

  useEffect(() => {
    setIsLike(comment.is_like);
    setLikeNum(comment.like_num);
  }, []);

  const clickLikeButton = async (comment_id?: Number) => {
    try {
      const res = await instance.post(`/comments/${comment_id}/like`);
      setIsLike((isLike) => !isLike);
      if (res.data === 'delete likes') setLikeNum((likeNum) => likeNum - 1);
      else if (res.data === 'add likes') setLikeNum((likeNum) => likeNum + 1);
    } catch (e) {
      navigate('/error');
    }
  };

  return (
    <div>
      <div className={styles.commentUser}>
        <div>
          <Link
            to={`/profile/${comment.intra_id}`}
            style={{ all: 'unset', cursor: 'pointer' }}
          >
            <span>{comment.intra_id}</span>
          </Link>
          <span className={styles.commentUserBadge}>
            레벨{comment.user_level}
          </span>
        </div>
        {showCommentEdit && (
          <span
            className={styles.commentEditBtn}
            onClick={() => {
              setModal({
                modalName: 'commentEdit',
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
          ? str.slice(0, 300) + '...'
          : str}
      </div>
      <div className={styles.likeContainer}>
        <button
          className={styles.emptyButton}
          onClick={() => clickLikeButton(comment.comment_id)}
        >
          {isLike ? (
            <Like2 className={styles.heart} />
          ) : (
            <Like className={styles.heart} />
          )}
        </button>
        <span className={styles.heartNum}>{likeNum}</span>
      </div>
    </div>
  );
};
export default PrintComment;
