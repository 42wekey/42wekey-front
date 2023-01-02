import Menu from "./menu/Menu";
import styles from './Main.module.css';
import PdfIndex from "./pdf-index/PdfIndex";

export default function Main() {
    return (
        <div className={styles.container}>
            <Menu />
            <div className={styles.width}>
                <PdfIndex />
            </div>
        </div>
    );
}