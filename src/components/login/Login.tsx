import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Login(){
    const loginUrl = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-51653061ff64d007d7e3269016e85b84b88ea3acd89dabcb3370e475ea6810b8&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fseoul42&response_type=code';

    return (
        <>
            <h2>42ence</h2>
            <a href={loginUrl}>Log in</a>
        </>
    );
};