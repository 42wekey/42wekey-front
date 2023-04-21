import styles from "./SubjectRankContent.module.css";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Link } from "react-router-dom";
import { ReactComponent as EmptyStar } from "../../emptyStar.svg";

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
            {props.subject?.map((value, i) => (
              <div key={i} className={styles.contentLine}>
                <div className={styles.rank}>
                  <div className={styles.rating}>{i + 1}</div>
                  <Link to={`/${value.circle}_circle/${value.subject_name}`} className={styles.subjectCircle}>
                  {/* <div className={styles.subjectCircle}> */}
                    <div className={styles.subject}>{value.subject_name}</div>
                    <div className={styles.subjectDivisionLine}></div>
                    <div className={styles.circle}>
                      <>{value.circle}_Circle</>
                    </div>
                  {/* </div> */}
                  </Link>
                  <div className={styles.rankContent}>
                    <div className={styles.starLayout}>
                      <EmptyStar fill={"#FEDB22"} className={styles.star}/>
                      {/* <StarRateIcon color="primary" /> */}
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
  );
}
