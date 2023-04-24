import { Chip, Rating } from "@mui/material";
import { useState, useEffect } from "react";
import Graph from "./graph/Graph";
import styles from "./SubjectAnalysis.module.css";
import SubjectDetailAvg from "./SubjectDetailAvg";
import StarIcon from "../../../images/StarIcon.svg";
import { StarRating } from "../../hooks/StarRating";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface subject {
  sbjname: string;
}

interface sbjAvg {
  comment_num: number;
  avg_star_rating: number;
  total_star_rating: number[];
  time_taken?: { title: string; value: number; detail: number[] };
  amount_study?: { title: string; value: number; detail: number[] };
  bonus?: { title: string; value: number; detail: number[] };
  difficulty?: { title: string; value: number; detail: number[] };
}

export default function Analysis({ sbjname }: subject) {
  const [sbjAvg, setSbjAvg] = useState<sbjAvg>();
  const total = [5, 4, 3, 2, 1];

  useEffect(() => {
    fetch(`${baseUrl}/sbj_avg`)
      .then((res) => res.json())
      .then((data) => setSbjAvg(data));
  }, []);

  return (
    sbjAvg && (
      <div className={styles.container}>
        <div className={styles.review}>리뷰 ({sbjAvg?.comment_num})</div>
        <div className={styles.flex}>
          <div className={styles.flexItem}>
            <div className={styles.borderRight}>
              <div
                className={styles.ratingStr}
              >{`${sbjAvg?.avg_star_rating}`}</div>
              <StarRating star_rating={sbjAvg.avg_star_rating} />
            </div>
          </div>
          <div className={styles.flexItem}>
            {total.map((value, i) => (
              <div key={i} className={styles.avgGraph && styles.minusMargin}>
                <span className={styles.smallFont}>{value}점</span>
                <div className={styles.bar_chart}>
                  <div
                    className={styles.bar}
                    style={{
                      width: `${
                        (sbjAvg.total_star_rating[value - 1] /
                          sbjAvg.comment_num) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <span className={styles.smallFont}>{`${
                  (sbjAvg?.total_star_rating[value - 1] / sbjAvg?.comment_num) *
                  100
                }%`}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.avg_container}>
          {sbjAvg.time_taken !== undefined && (
            <SubjectDetailAvg
              name="소요시간"
              detail_title={`${sbjAvg?.time_taken?.title}`}
              detail_value={parseInt(`${sbjAvg?.time_taken?.value}`)}
              detail={sbjAvg?.time_taken?.detail}
            />
          )}
          {sbjAvg.difficulty !== undefined && (
            <SubjectDetailAvg
              name="난이도"
              detail_title={`${sbjAvg?.difficulty?.title}`}
              detail_value={parseInt(`${sbjAvg?.difficulty?.value}`)}
              detail={sbjAvg.difficulty.detail}
            />
          )}
          {sbjAvg.amount_study !== undefined && (
            <SubjectDetailAvg
              name="학습량"
              detail_title={`${sbjAvg?.amount_study?.title}`}
              detail_value={parseInt(`${sbjAvg?.amount_study?.value}`)}
              detail={sbjAvg?.amount_study?.detail}
            />
          )}
          {sbjAvg.bonus !== undefined && (
            <SubjectDetailAvg
              name="보너스"
              detail_title={`${sbjAvg.bonus.title}`}
              detail_value={parseInt(`${sbjAvg.bonus.value}`)}
              detail={sbjAvg.bonus.detail}
            />
          )}
        </div>
      </div>
    )
  );
}
