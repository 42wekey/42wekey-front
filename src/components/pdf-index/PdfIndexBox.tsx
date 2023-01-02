import PdfIndexItem from "./PdfIndexItem";
import styles from './PdfIndexBox.module.css'
import dummy from '../../db/data.json';

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