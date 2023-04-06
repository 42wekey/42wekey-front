import { useEffect, useState } from "react";
import styles from "./RecentComment.module.css"

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
		<div>방금올라온 리뷰</div>
		<div>
      {recentCommentList.map((data, index) => (
        <div key={index}>
			{data.comment}
			</div>
      ))}
	  </div>
	  </div>
    </div>
  );
}
