import { useParams } from "react-router";
import Menu from "../menu/Menu";
import { profileState } from "../../utils/recoil/user";
import { useRecoilState } from "recoil";
import MyCommentList from "./MyCommentList";
import styles from "./MyComment.module.css"

export default function MyComment() {
  const [userState, setProfileState] = useRecoilState(profileState);
  return (
    <div>
      <Menu intraId={userState.intraId} />
      
      <div className={styles.myComment}>
      {userState.intraId}
      <MyCommentList />
      </div>
    </div>
  );
}
