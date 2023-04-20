import Menu from "../menu/Menu";
import { profileState } from "../../utils/recoil/user";
import { useRecoilState } from "recoil";
import MyPageAvg from "./MyPageAvg";
import styles from "./MyPage.module.css";
import { useState, useEffect } from "react";
import CommentList from "./CommentList";
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
  const [myComments, setMyComments] = useState([]);
  const [likeComments, setLikeComments] = useState([]);
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
      .then((data) => setMyComments(data));
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/likeComment`)
      .then((res) => res.json())
      .then((data) => setLikeComments(data));
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/successComment`)
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
        {menuName === "마이페이지" ? "내가 작성한 리뷰" : (`작성한 리뷰 ${profileUser.my_comment_num}`) }
      </button>
      {menuName === "마이페이지" && <button onClick={() => setContentState("likeComment")}>
        좋아요한 리뷰
      </button>}
      <div>
        {contentState === "writeableComment" && <div>작성 가능한 리뷰</div>}
        {contentState === "myComment" && <CommentList comments={myComments} />}
        {contentState === "likeComment" && menuName === "마이페이지" && (
          <CommentList comments={likeComments} />
        )}
      </div>
      <div>
        로그아웃
      </div>
    </div>
  );
}
