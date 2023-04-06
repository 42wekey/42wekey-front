import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import Graph from "./graph/Graph";
import NewGraph from "./graph/NewGraph";
import styles from "./SubjectAnalysis.module.css";

interface subject {
  sbjname: String;
}

interface sbjAvg {
  comment_num: Number;
  avg_star_rating: Number;
  total_star_rating: Number;
  time_taken?: { title: String; value: Number };
  amount_study?: { title: String; value: Number };
  bonus?: { title: String; value: Number };
  difficulty?: { title: String; value: Number };
}

export default function Analysis({ sbjname }: subject) {
  const [sbjAvg, setSbjAvg] = useState<sbjAvg>();
  const total = [5, 4, 3, 2, 1];
  const total_avg = (5);

  useEffect(() => {
    fetch(`http://localhost:3001/sbj_avg`)
      .then((res) => res.json())
      .then((data) => setSbjAvg(data));
  }, []);

//  useEffect(() => {
//	for(let i=4; i >= 0; i--){
//		if (sbjAvg.total_star_rating[i] && sbjAvg.comment_num)
//			total_avg[i] = sbjAvg.total_star_rating[i]/sbjAvg.comment_num*100;
//	}
//  }, [sbjAvg]);



  return (
    <div className={styles.container}>
      <div className={styles.review}>리뷰 ({sbjAvg?.comment_num})</div>
      <div className={styles.flex}>
        <div className={styles.flexItem}>
          <div className={styles.ratingStr}>{sbjAvg?.avg_star_rating}</div>
          <Rating width="105px" value={sbjAvg?.avg_star_rating ?? 0} />
        </div>
        <div className={styles.flexItem}>
          {total.map((value) => (
            <div className={styles.avgGraph}>
              <span className={styles.smallFont}>{value}점</span>
              <span className={styles.smallFont}>
			  <div className={styles.bar_chart}>
				<div className={styles.bar} style={{width: "70%"}} />
			  </div>
              </span>
              <span className={styles.smallFont}>{sbjAvg?.total_star_rating[value - 1]}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>소요시간</div>
        <div>난이도</div>
        <div>학습량</div>
        <div>보너스</div>
      </div>
    </div>
  );
}
