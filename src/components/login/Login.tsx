import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ClassNames } from '@emotion/react';
import styles from './Login.module.css';
import { ReactComponent as Wekey42 } from "../42wekey.svg";

export default function Login(){
    const loginUrl = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-51653061ff64d007d7e3269016e85b84b88ea3acd89dabcb3370e475ea6810b8&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fseoul42&response_type=code';

    return (
        <div className={styles.container}>
            <Wekey42 className={styles.logo}/>
            <a href={loginUrl} className={styles.loginBtn}>로그인</a>
        </div>
    );
};