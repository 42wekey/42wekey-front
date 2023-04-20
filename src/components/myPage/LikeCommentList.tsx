import { useEffect, useState } from "react";
import styles from "../subject_detail/SubjectComment.module.css";
import LikeComments from "./LikeComments";
import { Comment, CommentProps } from "../subject_detail/PrintComment";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface intraId {
  intraId: String;
}

interface commentList {
  comments: Comment[];
}

export default function LikeCommentList({ comments }: commentList) {
  const [sortOption, setSortOption] = useState("recent");
  const [userState, setUserState] = useRecoilState(profileState);

  return (
    <div className={styles.subjectComment}>
      {comments.map((data, index) => (
        <div className={styles.comment} key={index}>
          <LikeComments comment={data} />
        </div>
      ))}
    </div>
  );
}
