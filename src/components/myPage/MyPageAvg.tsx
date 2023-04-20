import styles from './MyPageAvg.module.css'

export default function MyPageAvg() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div>{0}</div>
        <div>작성 가능한 리뷰</div>
      </div>
      <div className={styles.box}>
        <div>{1}</div>
        <div>내 리뷰</div>
      </div>
      <div className={styles.box}>
        <div>{2}</div>
        <div>좋아요한 리뷰</div>
      </div>
    </div>
  );
}
