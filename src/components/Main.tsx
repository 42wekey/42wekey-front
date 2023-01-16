import Menu from "./menu/Menu";
import styles from "./Main.module.css";
import CommentInput from "./comment_input/CommentInput";
import PdfDetail from "./subject_detail/SubjectDetail";
import PdfIndex from "./subject_index/SubjectIndex";

export default function Main() {
  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.width}>
        <CommentInput />
        <PdfDetail />
        <PdfIndex />
      </div>
    </div>
  );
}
