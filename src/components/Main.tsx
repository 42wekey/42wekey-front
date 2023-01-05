import Menu from "./menu/Menu";
import styles from './Main.module.css';
import PdfIndex from "./pdf-index/PdfIndex";
import PdfDetail from "./pdf-index/pdf_detail/PdfDetail";

export default function Main() {
    return (
        <div className={styles.container}>
            <Menu />
            <div className={styles.width}>
                <PdfDetail />
                <PdfIndex />
            </div>
        </div>
    );
}