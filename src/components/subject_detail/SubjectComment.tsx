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

interface commentList {
  comments: Comment[];
}

export default function SubjectComment({ comments }: commentList) {
  const [sortOption, setSortOption] = useState("recent");

  const handleSortOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOption(event.target.value);
  };

  const sortedObjects = comments.slice().sort((a, b) => {
    if (sortOption === "like")
      return b.like - a.like;
    else if (sortOption === "recent")
      return new Date(b.comment_time).getTime() - new Date(a.comment_time).getTime();
  });

  return (
    <div className={styles.subjectComment}>
      <div className={styles.commentListHeader}>
        <span>상세리뷰</span>
        <select value={sortOption} onChange={handleSortOptionChange}>
          <option value="recent">최신순</option>
          <option value="like">좋아요순</option>
        </select>
      </div>
      {sortedObjects.map((data, index) => (
        <div className={styles.comment} key={index}>
          <PrintComment comment={data} />
        </div>
      ))}
    </div>
  );
}
