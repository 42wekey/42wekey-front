import styles from "./Graph.module.css";

interface graphInfo {
  time_taken: string;
  amount_study: string;
  difficulty: string;
}

export default function Graph({
  time_taken,
  amount_study,
  difficulty,
}: graphInfo) {
  const searchTime = (time_taken: string) => {
    return time_taken === "three_month"
      ? "100%"
      : time_taken === "a_month"
      ? "80%"
      : time_taken === "three_week"
      ? "60%"
      : time_taken === "two_week"
      ? "40%"
      : "20%";
  };

  const searchAmount = (amount_study: string) => {
    return amount_study === "high"
      ? "100%"
      : amount_study === "middle"
      ? "66%"
      : "33%";
  };

  const searchDiff = (difficulty: string) => {
    return difficulty === "hard"
      ? "100%"
      : difficulty === "normal"
      ? "66%"
      : "33%";
  };

  return (
    <div className={styles.container}>
      <div className={styles.graph}>
        <div className={styles.explanation}>시간</div>
        <div className={styles.graph_bar}>
          <div
            className={styles.progress}
            style={{ width: searchTime(time_taken) }}
          ></div>
        </div>
      </div>
      <div className={styles.graph}>
        <div className={styles.explanation}>학습량</div>
        <div className={styles.graph_bar}>
          <div
            className={styles.progress}
            style={{ width: searchAmount(amount_study) }}
          ></div>
        </div>
      </div>
      <div className={styles.graph}>
        <div className={styles.explanation}>난이도</div>
        <div className={styles.graph_bar}>
          <div
            className={styles.progress}
            style={{ width: searchDiff(difficulty) }}
          ></div>
        </div>
      </div>
    </div>
  );
}
