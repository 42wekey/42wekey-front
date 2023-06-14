import { Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./SubjectComment.module.css";
import Graph from "./graph/Graph";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PrintComment, { CommentProps, Comment } from "./PrintComment";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface intraId {
  intraId: String;
}

interface commentList {
  comments: Comment[];
}

export default function SubjectComment({ comments }: commentList) {
  const [sortOption, setSortOption] = useState("recent");
  const [userState, setUserState] = useRecoilState(profileState);
  document.cookie = "key=value; expires=expiration_time; path=/";

  function checkCommentEdit(comment:Comment){
    if (userState.intra_id === comment.intra_id)
      return true;
    else
      return false;
  }

  const handleSortOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOption(event.target.value);
  };

  const sortedObjects = comments.slice().sort((a ,b) => {
    if (sortOption === "like") return b.like_num - a.like_num;
    else if (sortOption === "recent")
      return (
        new Date(b.update_time).getTime() - new Date(a.update_time).getTime()
      );
    else if (sortOption === "rating") return b.star_rating - a.star_rating;
  });

  return (
    <div className={styles.subjectComment}>
      <div className={styles.commentListHeader}>
        <span>상세리뷰</span>
        <div className={styles.sortContainer}>
          <select
            className={styles.commentSort}
            value={sortOption}
            onChange={handleSortOptionChange}
          >
            <option value="recent">최신순</option>
            <option value="like">좋아요순</option>
            <option value="rating">별점순 </option>
          </select>
          <KeyboardArrowDownRoundedIcon className={styles.sortBtn}/>
        </div>
      </div>
      {sortedObjects.map((data, index) => (
        <div className={styles.comment} key={index}>
          <PrintComment comment={data} showCommentEdit={checkCommentEdit(data)}/>
        </div>
      ))}
    </div>
  );
}
