import Menu from "../menu/Menu";
import { profileState } from "../../utils/recoil/user";
import { useRecoilState } from "recoil";
import MyPageAvg from "./MyPageAvg";
import MyCommentList from "./MyCommentList";
import styles from "./MyPage.module.css";
import { useState, useEffect } from "react";
import LikeCommentList from "./LikeCommentList";
import { useParams } from "react-router";

interface Profile {
  user_level: number;
  my_comment_num: number;
  recommend_comment: number;
}

export default function MyComment() {
  const [userState, setProfileState] = useRecoilState(profileState);
  const [contentState, setContentState] = useState("writeableComment");
  const [profileUser, setProfileUser] = useState<any>({});
  const [myComment, setMyComment] = useState([]);
  const [likeComment, setLikeComment] = useState([]);
  const [successSbj, setSuccessSbj] = useState<any>({});
  const { intraId } = useParams();

  const menuName = userState.intraId === intraId ? "마이페이지" : "프로필";

  const baseUrl = `${process.env.REACT_APP_END_POINT}`;

  useEffect(() => {
    fetch(`${baseUrl}/user_status`)
      .then((res) => res.json())
      .then((data) => setProfileUser(data));
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/myComment`)
      .then((res) => res.json())
      .then((data) => setMyComment(data));
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/likeComment`)
      .then((res) => res.json())
      .then((data) => setLikeComment(data));
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/successSbj`)
      .then((res) => res.json())
      .then((data) => setSuccessSbj(data));
  }, []);

  return (
    <div>
      <Menu menuName={menuName} />
      <div className={styles.container}>
        <div>
          <span>{intraId}</span>
          <span>{profileUser.user_level}</span>
          <span>회원정보 업데이트</span>
        </div>
        <div className={styles.line} />
        {menuName === "마이페이지" && <MyPageAvg />}
      </div>
      <button onClick={() => setContentState("writeableComment")}>
        작성 가능한 리뷰
      </button>
      <button onClick={() => setContentState("myComment")}>
        내가 작성한 리뷰
      </button>
      <button onClick={() => setContentState("likeComment")}>
        좋아요한 리뷰
      </button>
      <div>
        {contentState === "writeableComment" && <div>작성 가능한 리뷰</div>}
        {contentState === "myComment" && <div>내가 작성한 리뷰</div>}
        {contentState === "likeComment" && menuName === "마이페이지" && (
          <div>좋아요한 리뷰</div>
        )}
      </div>
    </div>
  );
}
