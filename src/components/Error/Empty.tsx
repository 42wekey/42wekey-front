import styles from "./Empty.module.css";
import { useRecoilState } from 'recoil';
import { errorState } from '../../utils/recoil/error';
import { redirect, useNavigate } from "react-router";

// const Empty = (): JSX.Element => {
//     return (
//         <div className={styles.container}>
//             <CircularProgress />
//             <h2 className={styles.text}>잘못된 접근입니다</h2>
//             <Link to='/'>돌아가기</Link>
//         </div>
//     );
// }

// export default Empty;


export default function ErrorPage() {
  const [error, setError] = useRecoilState(errorState);
  const navigate = useNavigate();

  const goHome = () => {
    setError('');
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <div className={styles.title}>42Wiki</div>
        <div className={styles.error}>
          {error === 'error404'
            ? '잘못된 요청입니다!'
            : '데이터 요청에 실패하였습니다.'}
          <div className={styles.errorCode}><>({error})</></div>
        </div>
        <div onClick={goHome}>
          <div >
            <input type='button' value='🏠 홈으로 🏠' />
          </div>
        </div>
      </div>
    </div>
  );
}
