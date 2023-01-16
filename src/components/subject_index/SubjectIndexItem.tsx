import dummy from '../../db/data.json';
import styles from './SubjectIndexItem.module.css';

export interface PdfIndexItemProps {
    circle: number;
}

export default function PdfIndexItem(props: PdfIndexItemProps) {
    const data = dummy.subjects.filter((subject) =>
        Number(subject.circle) === Number(props.circle)
    );

    return (
        <div>
            {data.map((data) =>
                <div className={styles.sbj} key={data.id}>
                    <h1>{data.sbj_name}</h1>
                    <button className={styles.sbj_btn}>pdf</button>
                </div>
            )}
        </div >
    );
}