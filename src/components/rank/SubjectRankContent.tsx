import styles from "./SubjectRankContent.module.css";
import StarRateIcon from "@mui/icons-material/StarRate";

interface SubjectRankType {
  subject_name: String;
  value: Number | String;
  circle: Number;
}

interface SubjectRank {
  title: String;
  subject: SubjectRankType[];
}

export default function SubjectRankContent(props: SubjectRank) {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <div>
            {props.subject?.map((value, i) => (
              <div key={i} className={styles.contentLine}>
                <div className={styles.rank}>
                  <div className={styles.rating}>{i + 1}</div>
                  <div className={styles.subjectCircle}>
                    <div className={styles.subject}>{value.subject_name}</div>
                    <div className={styles.subjectDivisionLine}></div>
                    <div className={styles.circle}>
                      <>{value.circle}Circle</>
                    </div>
                  </div>
                  <div className={styles.rankContent}>
                    <div className={styles.star}>
                      <StarRateIcon color="primary" />
                    </div>
                    <div className={styles.starRating}>{`${value.value}`}</div>
                  </div>
                </div>
                <div
                  className={`${
                    i + 1 === props.subject.length
                      ? styles.division
                      : styles.divisionLine
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
