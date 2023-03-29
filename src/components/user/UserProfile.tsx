import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";
import styles from "./UserProfile.module.css";

interface UserStatus {
  my_comment_num: Number;
  recommend_comment: Number;
}

export default function UserProfile() {
  const [userStatus, setUserStatus] = useState<UserStatus>();
  const [userInfo, setUserInfo] = useRecoilState(profileState);

  useEffect(() => {
    fetch(`http://localhost:3001/user_status`)
      .then((res) => res.json())
      .then((data) => setUserStatus(data));
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profile}>
        {userInfo?.intraId}님 Lv.{userInfo.user_level}
        <button>로그아웃</button>
      </div>
      <div className={styles.profile}>
        <>내 후기 {userStatus?.my_comment_num} 개</>
      </div>
      <div className={styles.profile}>
        <>좋아요 {userStatus?.recommend_comment} 개</>
      </div>
    </div>
  );
}
