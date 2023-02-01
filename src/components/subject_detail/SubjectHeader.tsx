import styles from './SubjectDetail.module.css'
import dummy from '../../db/data.json'
import { CircleRounded } from '@mui/icons-material'
interface paramType{
	info: {circle: string, sbj_name: string}
	// circle: string
	// sbj_name: string;
}


export default function SubjectHeader({info}: paramType) {
	return (
		<div className={styles.SubjectHeader}>
			{info.circle} - {info.sbj_name}
		</div>
	)
}

// export default function SubjectHeader({circle, sbj_name}: paramType) {
// 	return (
// 		<div className={styles.SubjectHeader}>
// 			{circle} - {sbj_name}
// 		</div>
// 	)
// }