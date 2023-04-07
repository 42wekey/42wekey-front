import { Chip } from "@mui/material";
import styles from "./SubjectDetailAvg.module.css"

interface chip {
  name: String;
  detail_title: String;
  detail_value: Number;
}

export default function SubjectDetailAvg({ name, detail_title, detail_value }: chip) {
  return (
    <div className={styles.flex}>
      <div className={styles.name && styles.font}>{name}</div>
	  <div className={styles.chip}>
		<span className={styles.chipTitle}>
		{detail_title}
		</span>
	  </div>
	  <div className={styles.baseline} />
	  <div className={styles.font}>{`${detail_value}%`}</div>
    </div>
  );
}
