import { useEffect, useState } from "react";
import styles from "./RecentComment.module.css";
import StarRateIcon from "@mui/icons-material/StarRate";

interface recentComment {
  subject: String;
  star_rating: Number;
  comment: String;
  time: String;
}

export default function RecentComment() {
  const [recentCommentList, setRecentCommentList] = useState<recentComment[]>(
    []
  );
  useEffect(() => {
    fetch(`http://localhost:3001/recent_comment`)
      .then((res) => res.json())
      .then((data) => setRecentCommentList(data));
  }, []);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>방금올라온 리뷰</div>
        <div className={styles.commentBox}>
          {recentCommentList.map((data, index) => (
            <div key={index} className={styles.recentComment}>
				
              <div className={styles.subjectStarRating}>
                <div className={styles.subjectName}>{data.subject}</div>
                <div> <StarRateIcon color="primary" /> </div>
                <div>{`${data.star_rating}`}</div>
              </div>
              <div className={styles.comment}>{data.comment}</div>
              <div className={styles.dateTime}>{data.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
