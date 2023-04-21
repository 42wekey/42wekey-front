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


export default function Main() {
  const [userInfo, setUserInfo] = useRecoilState(profileState)

  return (
    // Link to={`/${value.circle}_circle/${value.subject_name}`} className={styles.subjectCircle}>
    <div className={styles.container}>
      <div className={styles.headLine}>
        <Wekey42 className={styles.logo}/>
        <Link to={`/profile/${userInfo.intraId}`} className={styles.myProfile}><PermIdentityIcon className={styles.myProfile}/></Link>
        
      </div>
      {/* <Menu 
      intraId={userInfo.intraId}/> */}
      {/* <div className={styles.userProfile}>
        <UserProfile/>
      </div> */}
      <div className={styles.subjectRank}>
        <SubjectRank/>
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
