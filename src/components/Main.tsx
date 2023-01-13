import Menu from "./menu/Menu";
import styles from "./Main.module.css";
import PdfIndex from "./pdf-index/PdfIndex";
import PdfDetail from "./pdf-index/pdf_detail/PdfDetail";
import CommentInput from "./comment-input/CommentInput";

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
