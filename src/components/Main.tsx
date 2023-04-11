import Menu from "./menu/Menu";
import styles from "./Main.module.css";
import SubjectIndex from "./subject_index/SubjectIndex";
import {profileState} from "../utils/recoil/user"
import { useRecoilState } from "recoil";
import SubjectRank from "./rank/SubjectRank";
import UserProfile from "./user/UserProfile";
import { useEffect } from "react";
import RecentComment from "./RecentComment/RecentComment";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;

export default function Main() {
  const [userInfo, setUserInfo] = useRecoilState(profileState)

  useEffect(() => {
    fetch(`${baseUrl}/user_me`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);

  return (
    <div className={styles.container}>
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
