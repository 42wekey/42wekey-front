import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";
import styles from "./UserProfile.module.css";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface UserStatus {
  my_comment_num: Number;
  recommend_comment: Number;
}

export default function UserProfile() {
  const [userStatus, setUserStatus] = useState<UserStatus>();
  const [userInfo, setUserInfo] = useRecoilState(profileState);

  useEffect(() => {
    fetch(`${baseUrl}/user/status`)
      .then((res) => res.json())
      .then((data) => setUserStatus(data));
  }, []);

  function Space({space = 3}) {
    return (
    	<span style={{ paddingRight: space }}></span>
    );
}

  return (
    <div className={styles.profile}>
      <div className={styles.intraStatus}>
        <div className={styles.intraId}>{`${userInfo?.intra_id}님`} </div>
        <div className={styles.level}>{`레벨 ${userInfo.level}`}</div>
        {/* <button>로그아웃</button> */}
      </div>
      <div className={styles.myComment}>
        <p><strong>내 후기</strong> <Space /> <span className={styles.number}> <strong>{`${userStatus?.my_comment_num}`}</strong></span></p>
      </div>
      <div className={styles.myLike}>
        <p><strong>좋아요</strong><Space/> <span className={styles.number}> <strong>{`${userStatus?.recommend_comment}`}</strong></span></p>
      </div>
    </div>
  );
}
