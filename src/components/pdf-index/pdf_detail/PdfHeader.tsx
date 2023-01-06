import styles from './PdfDetail.module.css'
import dummy from '../../../db/data.json'

export default function PdfHeader() {
	return (
		<div className={styles.pdfHeader}>
			PDF - {dummy.circles[0].circle} - {dummy.subjects[1].sbj_name}
		</div>
	)
}