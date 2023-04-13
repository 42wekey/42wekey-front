import { Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./SubjectComment.module.css";
import Graph from "./graph/Graph";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PrintComment, { CommentProps, Comment } from "./PrintComment";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface intraId {
  intraId: String;
}

interface commentList{
    comments: Comment[];
}

export default function SubjectComment({comments}:commentList) {

  return (
    <div className={styles.subjectComment}>
      <div className={styles.commentListHeader}>
        <span>상세리뷰</span>
        <span>최신순 ▼</span>
      </div>
      {comments.map((data, index) => (
        <div className={styles.comment} key={index}>
          <PrintComment comment={data} />
        </div>
      ))}
    </div>
  );
}
