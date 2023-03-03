import PdfIndexBox from './SubjectIndexBox';
import styles from './SubjectIndex.module.css';
import { useEffect, useState } from 'react';

export interface PdfIdx {
    id: number;
    circle: number;
};


export default function PdfIndex() {
    const [circle, setCircle] = useState<PdfIdx[]>([]);
    useEffect(() => {
        fetch(`http://localhost:3001/circles`)
            .then(res => res.json())
            .then(data => setCircle(data));
    }, []);

    return (
        <div className={styles.test} >
        <ul className={styles.container}>
            {circle.map((circle) =>
                <li className={styles.listTitle} key={circle.circle}>
                    <PdfIndexBox circle={circle.circle} />
                </li>
            )}
        </ul>
        </div>
    );
}