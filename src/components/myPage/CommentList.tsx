import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../subject_detail/SubjectComment.module.css";
import Comments, { CommentProps } from "./Comments";
import { Comment } from "../subject_detail/PrintComment";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";
import { ClassNameConfigurator } from "@mui/base";

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
          <Link to={`/${data.circle}_circle/${data.subject_name}`} className={styles.commentBox}><Comments comment={data} isLikeComment={isLikeComment} /></Link>
        </div>
      ))}
    </div>
  );
}
