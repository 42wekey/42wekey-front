import styles from "./Footer.module.css";
import imgUrl from "../../github.png";

export default function Footer() {
  return (
    <div className={styles.container}>
      <img src={imgUrl} alt='깃허브 주소'className={styles.img}></img>
      <a href='https://github.com/42ence' className={styles.text}>github.com/42wekey</a>
    </div>
  );
}
