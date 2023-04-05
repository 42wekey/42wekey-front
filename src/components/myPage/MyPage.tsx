import Menu from "../menu/Menu";
import { profileState } from "../../utils/recoil/user";
import { useRecoilState } from "recoil";
import MyCommentList from "./MyCommentList";
import styles from "./MyComment.module.css";
import { useState } from "react";
import LikeCommentList from "./LikeCommentList";

export default function MyComment() {
  const [userState, setProfileState] = useRecoilState(profileState);
  const [contentState, setContentState] = useState("myComment");

  return (
    <div>
      <Menu intraId={userState.intraId} />
      <button onClick={() => setContentState("myComment")}>
        내가 작성한 후기
      </button>
      <button onClick={() => setContentState("likeComment")}>
        좋아요한 후기
      </button>
      <div>
      {contentState === "myComment" ? (
        <div>내가 작성한 코멘트
          <MyCommentList />
        </div>
      ) : (
        <div>좋아요한 코멘트
          {/* <LikeCommentList/> */}
        </div>
      )}
      </div>
      {/* <div className={styles.myComment}>
      {userState.intraId}
      <MyCommentList />
      </div> */}
    </div>
  );
}
