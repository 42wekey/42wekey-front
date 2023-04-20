import { useEffect, useState } from "react";
import styles from "../subject_detail/SubjectComment.module.css";
import Comments, { CommentProps } from "./Comments";
import { Comment } from "../subject_detail/PrintComment";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface intraId {
  intraId: String;
}

interface commentList {
  comments: Comment[];
  isLikeComment:boolean;
}

export default function CommentList({ comments, isLikeComment }: commentList) {
  const [sortOption, setSortOption] = useState("recent");
  const [userState, setUserState] = useRecoilState(profileState);

  return (
    <div className={styles.subjectComment}>
      {comments.map((data, index) => (
        <div className={styles.comment} key={index}>
          <Comments comment={data} isLikeComment={isLikeComment} />
        </div>
      ))}
    </div>
  );
}
