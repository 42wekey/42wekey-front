import styles from "./SubjectDetail.module.css";
import PdfHeader from "./SubjectHeader";
import PdfInfo from "./SubjectInfo";
import PdfComment from "./SubjectComment";

export default function PdfDetail() {
  return (
    <div className={styles.pdf}>
      <PdfHeader />
      <div className={styles.content}>
        <PdfInfo />
        <PdfComment />
      </div>
    </div>
  );
}
