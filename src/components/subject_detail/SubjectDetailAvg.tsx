import { useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import styles from "./SubjectDetailAvg.module.css";

interface chip {
  name: String;
  detail_title: String;
  detail_value: Number;
  detail: Number[];
}

export default function SubjectDetailAvg({
  name,
  detail_title,
  detail_value,
  detail,
}: chip) {
  const [isVisible, setIsVisible] = useState(false);

  const onClick = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  return (
    <div className={styles.container} onClick={onClick}>
      <div>
        <div className={styles.flex}>
          <div className={styles.avg_name}>{name}</div>
          <div className={styles.small_flex}>
            <div className={styles.name && styles.font}>{detail_title}</div>
            <div className={styles.baseline} />
            <div
              className={styles.font && styles.font_color_blue}
            >{`${detail_value}%`}</div>
          </div>
          {isVisible ? (
            <KeyboardArrowUpRoundedIcon
              style={{ color: "#CBCBCB" }}
              className={styles.arrow_container}
            />
          ) : (
            <KeyboardArrowDownRoundedIcon
              style={{ color: "#CBCBCB" }}
              className={styles.arrow_container}
            />
          )}
        </div>
      </div>
      {isVisible === true &&
        <div>
          {detail.map((value, i) => (
            <div key={i} className={styles.graph}>
              <div className={styles.graph_pull} style={{width:`${value*2>100?100:value*2}%`}}>{value}%</div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
