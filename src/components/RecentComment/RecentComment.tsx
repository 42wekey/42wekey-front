import { useEffect, useState } from "react";
import styles from "./RecentComment.module.css";
import StarRateIcon from "@mui/icons-material/StarRate";
import { ReactComponent as EmptyStar } from "../../emptyStar.svg";
import {ConvertTime} from "../../hooks/ConvertTime";


const baseUrl = `${process.env.REACT_APP_END_POINT}`;

interface recentComment {
  subject: string;
  star_rating: number;
  comment: string;
  time: string;
}

export default function RecentComment() {
  const [recentCommentList, setRecentCommentList] = useState<recentComment[]>(
    []
  );
  useEffect(() => {
    fetch(`${baseUrl}/recent_comment`)
      .then((res) => res.json())
      .then((data) => setRecentCommentList(data));
  }, []);

  function getTime(targetTime:string) {
    const time = ConvertTime({title:"", time:targetTime});
    return time;
  }
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>방금 올라온 리뷰 🔥</div>
        <div className={styles.commentBox}>
          {recentCommentList.map((data, index) => (
            <div key={index} className={styles.recentComment}>
              <div className={styles.subjectStarRating}>
                <div className={styles.subjectName}>{data.subject}</div>
                <div >
                  <EmptyStar fill={"#FEDB22"} className={styles.star}/>
                </div>
                <div className={styles.starRating}>{`${data.star_rating}`}</div>
              </div>
              <div className={styles.comment}>{data.comment}</div>
              <div className={styles.dateTime}>
                <>
                {getTime(data.time)}
                {data.time}</></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
