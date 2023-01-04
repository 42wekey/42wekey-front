import { PdfIndexItemProps } from '../PdfIndexItem';
import styles from './PdfDetail.module.css'
import dummy from '../../../db/data.json'
import PdfViewer from './pdfViewer';

export function PdfHeader () {
	return (
		<div className={styles.pdfHeader}>
			PDF - {dummy.circles[0].circle} - {dummy.subjects[1].sbj_name}
		</div>
	)
}

export function PdfInfo () {
	return (
		<div className={styles.pdfInfo}>
			해당 과제는 쇼ㅏㄹ라쇼ㅏㄹ라
		</div>
	)
}

export function PdfComment () {
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