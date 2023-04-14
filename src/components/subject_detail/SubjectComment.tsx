import { Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./SubjectComment.module.css";
import Graph from "./graph/Graph";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PrintComment from "./PrintComment";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface intraId {
  intraId: String;
}

interface Comment {
  id: number,
  like: number,
  intraid: string,
  sbj_name: string,
  content: string,
  star_rating: number,
  time_taken: string,
  difficulty: string,
  isComment: Boolean;
  bonus: string,
  amount_study: string,
  comment_time: string
}

export default function SubjectComment({ comment }: {comment: Comment[]}) {
  // const [comment, setComment] = useState<comment[]>([]);
  

  return (
    <div className={styles.subjectComment}>
      {comment.map((data, index) => ( 
        <div className={styles.commentId} key={index}>
          <PrintComment commentData={data}/>
        </div>
      ))}
    </div>
  );
}
