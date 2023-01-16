import { PdfIndexItemProps } from "../PdfIndexItem";
import styles from "./PdfDetail.module.css";
//import dummy from '../../../db/data.json'
import PdfViewer from "./pdfViewer";
import PdfHeader from "./PdfHeader";
import PdfInfo from "./PdfInfo";
import PdfComment from "./PdfComment";

export default function PdfDetail() {
  return (
    <div className={styles.pdf}>
      <PdfHeader />
      <div className={styles.content}>
        <PdfInfo />
        <PdfViewer />
        <PdfComment />
      </div>
    </div>
  );
}
