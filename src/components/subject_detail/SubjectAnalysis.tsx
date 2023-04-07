import { Chip, Rating } from "@mui/material";
import { useState, useEffect } from "react";
import Graph from "./graph/Graph";
import styles from "./SubjectAnalysis.module.css";
import SubjectDetailAvg from "./SubjectDetailAvg";

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

  return (
    <div className={styles.container}>
      <div className={styles.review}>리뷰 ({sbjAvg?.comment_num})</div>
      <div className={styles.flex}>
        <div className={styles.flexItem }>
          <div className={styles.borderRight}>
            <div className={styles.ratingStr}>{`${sbjAvg?.avg_star_rating}`}</div>
            <Rating color="FF620A" width="105px" value={sbjAvg?.avg_star_rating ?? 0} />
          </div>
        </div>
        <div className={styles.flexItem}>
          {total.map((value) => (
            <div className={styles.avgGraph && styles.minusMargin}>
              <span className={styles.smallFont}>{value}점</span>
			        <div className={styles.bar_chart}>
				        <div className={styles.bar} style={{ width: `${(sbjAvg?.total_star_rating[value - 1]/sbjAvg?.comment_num)*100}%` }} />
			        </div>
              <span className={styles.smallFont}>{`${(sbjAvg?.total_star_rating[value - 1]/sbjAvg?.comment_num)*100}%`}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        {sbjAvg !== undefined && <SubjectDetailAvg name="소요시간" detail_title={`${sbjAvg?.time_taken?.title}`} detail_value={`${sbjAvg?.time_taken?.value}`}/>}
        {sbjAvg !== undefined && <SubjectDetailAvg name="난이도" detail_title={`${sbjAvg?.difficulty?.title}`} detail_value={`${sbjAvg?.difficulty?.value}`}/>}
        {sbjAvg !== undefined && <SubjectDetailAvg name="학습량" detail_title={`${sbjAvg?.amount_study?.title}`} detail_value={`${sbjAvg?.amount_study?.value}`}/>}
        {sbjAvg !== undefined && <SubjectDetailAvg name="보너스" detail_title={`${sbjAvg?.bonus?.title}`} detail_value={`${sbjAvg?.bonus?.value}`}/>}
      </div>
    </div>
  );
}
