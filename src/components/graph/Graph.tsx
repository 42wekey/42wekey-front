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
            style={{ 
              width: searchTime(time_taken),
              borderRadius: time_taken==="three_month"?`5px 5px 5px 5px`:`5px 0 0 5px` }}
          ></div>
          <div className={styles.split}>
            <div className={styles.five_split_graph_one} />
            <div className={styles.five_split_graph_two} />
            <div className={styles.five_split_graph_three} />
            <div className={styles.five_split_graph_four} />
          </div>
        </div>
      </div>
      <div className={styles.graph}>
        <div className={styles.explanation}>학습량</div>
        <div className={styles.graph_bar}>
          <div
            className={styles.progress}
            style={{ 
              width: searchAmount(amount_study),
              borderRadius: amount_study==="high"?`5px 5px 5px 5px`:`5px 0 0 5px` 
            }}
          ></div>
          <div className={styles.split}>
            <div className={styles.three_split_graph_one} />
            <div className={styles.three_split_graph_two} />
            <div className={styles.three_split_graph_three} />
          </div>
        </div>
      </div>
      <div className={styles.graph}>
        <div className={styles.explanation}>난이도</div>
        <div className={styles.graph_bar}>
          <div
            className={styles.progress}
            style={{ 
              width: searchDiff(difficulty),
              borderRadius: difficulty==="hard"?`5px 5px 5px 5px`:`5px 0 0 5px`
            }}
          ></div>
          <div className={styles.split}>
            <div className={styles.three_split_graph_one} />
            <div className={styles.three_split_graph_two} />
            <div className={styles.three_split_graph_three} />
          </div>
        </div>
      </div>
    </div>
  );
}
