import { Link } from 'react-router-dom';
import styles from "./Empty.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const Empty = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <CircularProgress />
            <h2 className={styles.text}>잘못된 접근입니다</h2>
            <Link to='/'>돌아가기</Link>
        </div>
    );
}

export default Empty;