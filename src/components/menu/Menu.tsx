import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

interface intraId{
  intraId:String;
  menuName:String;
}

interface subject{
  id: Number;
  circle: Number;
  sbj_name: String;
}

export default function Menu({intraId, menuName}:intraId) {
  return (
    <div className={styles.background}>
      <div className={styles.flex_row}>
          <div className={styles.prev_btn} onClick={() => window.history.back()}>
            <ArrowBackIosNewRoundedIcon />
          </div>
          <div className={styles.menu_name}>{menuName}</div>
      </div>
    </div>
  );
}
