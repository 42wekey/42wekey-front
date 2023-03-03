import Menu from "./menu/Menu";
import styles from "./Main.module.css";
import SubjectIndex from "./subject_index/SubjectIndex";
import {profileState} from "../utils/recoil/user"
import { useRecoilState } from "recoil";


export default function Main() {
  const [userState, setProfileState] = useRecoilState(profileState);
  return (
    <div className={styles.container}>
      <Menu 
      intraId={userState.intraId}/>
      <div className={styles.width}>
        <SubjectIndex />
      </div>
    </div>
  );
}
