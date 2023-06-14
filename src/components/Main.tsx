import Menu from "./menu/Menu";
import styles from "./Main.module.css";
import SubjectIndex from "./subject_index/SubjectIndex";
import {profileState} from "../utils/recoil/user"
import { useRecoilState } from "recoil";
import SubjectRank from "./rank/SubjectRank";
import UserProfile from "./user/UserProfile";
import { useEffect } from "react";
import RecentComment from "./RecentComment/RecentComment";
import { ReactComponent as Wekey42 } from "./42wekey.svg";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom'


export default function Main() {
  const [userInfo, setUserInfo] = useRecoilState(profileState)
    const baseUrl = `${process.env.REACT_APP_END_POINT}`;

  // const [isLogged, setIsLogged] = useState(false);
  // const [userInfo, setUserInfo] = useRecoilState(profileState)

//   useEffect(() => {
//     fetch(`${baseUrl}/user/me`,{
//       method : "POST",
//       headers : {
//            Authorization : `Bearer ${localStorage.getItem("access_token")}`
//       }
// })
//       .then((res) => res.json())
//       .then((data) => setUserInfo(data));
//   }, []);

//   const url = new URL(window.location.href);
//   const href = url.href;
//   const accessToken = href.split("token=")[1];

//   useEffect(() => {
//     if (accessToken) {
//       localStorage.setItem('42ence-token', accessToken);
//       setIsLogged(true);
//       // router.replace(`/`);
//     }
//     if (localStorage.getItem('42ence-token')) {
//       setIsLogged(true);
//     }
//     setIsLogged(false);
//   }, []);


  return (
    // Link to={`/${value.circle}_circle/${value.subject_name}`} className={styles.subjectCircle}>
    <div className={styles.container}>
      {userInfo.isLogin === false && <Navigate to="/login" replace={true}/>}
      <div className={styles.headLine}>
        <Wekey42 className={styles.logo}/>
        <Link to={`/profile/${userInfo.intra_id}`} className={styles.myProfile}><PermIdentityIcon className={styles.myProfile}/></Link>
      </div>
      {/* <Menu 
      intraId={userInfo.intraId}/> */}
      {/* <div className={styles.userProfile}>
        <UserProfile/>
      </div> */}
      <div className={styles.subjectRank}>
        {/* <SubjectRank/> */}
        </div>
      <div className={styles.width}>
        <SubjectIndex />
      </div>
      <div className={styles.width}>
        <RecentComment/>
      </div>
    </div>
  );
}
