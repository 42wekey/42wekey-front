import dummy from '../../../db/data.json';
import styles from './PdfDetail.module.css';

export default function PdfComment() {
    const data = dummy.comment
    return (
        <div className={styles.pdfComment}>
            {data.map((data) =>
                <div className={styles.commentId}>
                    <div>
                        {data.intraid} :
                    </div>
                    <div>
                        {data.comment} :
                    </div>
                    <div className={styles.commentTime}>
                        {data.time}
                    </div>
                </div>
            )}
        </div>
    )
}