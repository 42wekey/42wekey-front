import { useEffect, useState } from "react";
import styles from "./MyCommentList.module.css";
import PrintComment from "../subject_detail/PrintComment";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;

interface comment {
  id: number;
  like: number;
  intraid: string;
  sbj_name: string;
  content: string;
  star_rating: number;
  time_taken: string;
  difficulty: string;
  isComment: Boolean;
  bonus: string;
  amount_study: string;
  comment_time: string;
}

export default function MyCommentList() {
  const [myComment, setMyComment] = useState<comment[]>([]);

  useEffect(() => {
    fetch(`${baseUrl}/myComment`)
      .then((res) => res.json())
      .then((data) => setMyComment(data));
  }, []);

  return (
    <div className={styles.subjectComment}>
      {myComment.map((data, index) => (
        <div className={styles.commentId} key={index}>
          <PrintComment commentData={data} />
        </div>
      ))}
    </div>
  );
}
