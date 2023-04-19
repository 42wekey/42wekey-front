import { useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import styles from "./SubjectDetailAvg.module.css";
import { convertAmountStudy, convertBonus, convertDifficulty, convertTimeTaken} from "./PrintComment";

interface chip {
  name: string;
  detail_title: string;
  detail_value: number;
  detail: number[];
}

export default function SubjectDetailAvg({
  name,
  detail_title,
  detail_value,
  detail,
}: chip) {
  const [isVisible, setIsVisible] = useState(false);
  const maxValue = Math.max(...detail);

  const onClick = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  function setDetail(name:string, title:string):string{
    if (name === "소요시간")
      return convertTimeTaken(title);
    else if(name === "난이도")
      return convertDifficulty(title);
    else if(name === "보너스")
      return convertBonus(title);
    else if (name === "학습량")
      return convertAmountStudy(title);
    else
      return "none";
  }

  return (
    <div className={styles.container} onClick={onClick}>
      <div>
        <div className={styles.flex}>
          <div className={styles.avg_name}>{name}</div>
          <div className={styles.small_flex}>
            <div className={styles.font}>{setDetail(name, detail_title)}</div>
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
      {isVisible === true && (
        <div className={styles.graphContainer}>
          {detail.map((value, i) => (
            <div key={i} className={styles.graph}>
              <div
                className={maxValue===value?styles.graph_pull_max:styles.graph_pull}
                style={{ width: `${value}%` }}
              >
                {value}%
              </div>
              <div className={maxValue===value?styles.graphFontMax:styles.graphFont}>
                {value}%
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
