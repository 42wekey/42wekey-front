import { Link } from 'react-router-dom';
import styles from './Menu.module.css';

export default function Menu() {

    return (
        <div className={styles.background}>
            <div className={styles.flex_row}>
                <Link to='/'><h2 className={styles.logo}>42ence</h2></Link>
                <div>
                    <Link to='/' className={styles.subject}>subject</Link>
                    <Link to='/' className={styles.like42ence}>like42ence</Link>
                </div>
                <div className={styles.flex_row}>
                    <form className={styles.form}>
                        <input type="text" placeholder='과제 검색하기' />
                    </form>
                    <button className={styles.interface}>개인정보</button>
                </div>
            </div>
        </div>
    );
}