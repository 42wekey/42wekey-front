import Menu from "./menu/Menu";
import styles from "./Main.module.css";
import SubjectIndex from "./subject_index/SubjectIndex";
import {profileState} from "../utils/recoil/user"
import { useRecoilState } from "recoil";
import SubjectRank from "./rank/SubjectRank";
import UserProfile from "./user/UserProfile";
import { useEffect } from "react";


export default function Main() {
  const [userInfo, setUserInfo] = useRecoilState(profileState)

  useEffect(() => {
    fetch(`http://localhost:3001/user_me`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);

  return (
    <div className={styles.container}>
      <Menu 
      intraId={userInfo.intraId}/>
      <div>
        <UserProfile/>
      </div>
       <div className={styles.width}>
        <SubjectRank/>
        </div>
      <div className={styles.width}>
       
        <SubjectIndex />
      </div>
    </div>
  );
}
