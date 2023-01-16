import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

export default function Menu() {
  return (
    <div className={styles.background}>
      <div className={styles.flex_row}>
        <Link to="/" className={styles.logo}>
          <h2>42ence</h2>
        </Link>
        <div className={styles.menu}>
          <Link to="/" className={styles.subject}>
            subject
          </Link>
          <Link to="/" className={styles.subject}>
            like42ence
          </Link>
        </div>
        <div className={styles.flex_interface}>
          <form>
            <input
              type="text"
              placeholder="과제 검색하기"
              className={styles.form}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
