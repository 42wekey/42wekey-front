import PdfIndexItem from "./SubjectIndexItem";
import styles from './SubjectIndexBox.module.css'

export interface PdfIndexProps {
    circle: number;
};

export default function PdfIndexBox(props: PdfIndexProps) {
    return (
        <div className={styles.itemBox}>
            <h2>{props.circle} circle</h2>
            <PdfIndexItem circle={props.circle} />
        </div>
    );
}