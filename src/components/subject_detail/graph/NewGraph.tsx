import styles from "./NewGraph.module.css"
export default function NewGraph(){
	return (
		<div className={styles.bar_chart}>
			<div className={styles.bar} style={{width: '50%'}} />
		</div>
	);
}