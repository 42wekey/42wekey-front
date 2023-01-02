import dummy from '../../db/data.json';
import PdfIndexBox from './PdfIndexBox';
import styles from './PdfIndex.module.css';

export default function PdfIndex() {
    return (
        <ul className={styles.container}>
            {dummy.circles.map((circle) =>
                <li key={circle.id}>
                    <PdfIndexBox circle={circle.circle} />
                </li>
            )}
        </ul>
    );
}