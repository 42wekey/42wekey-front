import Menu from "./menu/Menu";
import styles from "./Main.module.css";
import CommentInput from "./comment_input/CommentInput";
import SubjectIndex from "./subject_index/SubjectIndex";

export default function Main() {
  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.width}>
        <SubjectIndex />
      </div>
    </div>
  );
}
