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



export default function Main() {


  return (
    <div className={styles.container}>
      <div >
        <Wekey42 className={styles.logo}/>
      </div>
      {/* <Menu 
      intraId={userInfo.intraId}/> */}
      <div className={styles.userProfile}>
        <UserProfile/>
      </div>
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
