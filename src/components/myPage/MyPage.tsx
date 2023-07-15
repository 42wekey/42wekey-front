import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { profileState } from '../../utils/recoil/user';
import styles from './MyPage.module.css';
import Menu from '../menu/Menu';
import WriteableList from './WriteableList';
import CommentList from './CommentList';
import { instance } from '../../utils/axios';
import { redirect, useNavigate } from "react-router";
import { errorState } from '../../utils/recoil/error';

interface Profile {
  user_level: number;
  my_comment_num: number;
  recommend_comment: number;
}

export default function MyComment() {
  const [userState, setProfileState] = useRecoilState(profileState);
  const [contentState, setContentState] = useState<string>('writeableComment');
  const [profileUser, setProfileUser] = useState<any>({});
  const [myComments, setMyComments] = useState([]);
  const [likeComments, setLikeComments] = useState([]);
  const [unreviewed, setUnreviewed] = useState<any>([]);
  const [unreviewedNumber, setUnreviewedNumber] = useState(0);
  const params = useParams() as { profile: string; intraId: string };
  const intraId = params.intraId;
  const [error, setError] = useRecoilState(errorState);
  const navigate = useNavigate();

  const menuName = userState.intra_id === intraId ? '마이페이지' : '프로필';

  //const baseUrl = `${process.env.REACT_APP_END_POINT}`;

  const getAll = async () => {
    try {
      // await instance.get(`/users/${intraId}/info`)
      // .then((res)=>{
      //   setProfileUser(res.data)
      //   instance.get(`/users/${intraId}/comments`)
      //   .then((res)=>{
      //     setMyComments(res.data);
      //     instance.get(`/users/me/likes`)
      //     .then((res) => {
      //       setLikeComments(res.data);
      //       instance.get(`/users/${intraId}/unreviewed`)
      //       .then((res)=>{
      //         setUnreviewed(res.data);
      //       })
      //     })
      //   })
      // })
      // .catch((e)=>{
      //   if (!(e.response && e.response.status === 401)) {
      //     setError('SubjectRank');
      //     navigate('/error');
      //   }
      // })
      let res = await instance.get(`/users/${intraId}/info`);
      setProfileUser(res.data);
      console.log(profileUser);
      res = await instance.get(`/users/${intraId}/comments`);
      setMyComments(res.data);
      console.log(myComments);
      res = await instance.get(`/users/me/likes`);
      setLikeComments(res.data);
      console.log(likeComments);
      res = await instance.get(`/users/${intraId}/unreviewed`);
      setUnreviewed(res.data);
      console.log(unreviewed);
    } catch (e) {
      setError('MyPage');
      navigate("/error");
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    const number = unreviewed.length;
    setUnreviewedNumber(number);
  }, [unreviewed]);

  const onClick = () => {
    console.log('로그아웃');
  };

  const UserState = () => (
    <div className={styles.userState}>
      <div>
        <span className={styles.userId}>{intraId}</span>
        <span className={styles.userLevel}>레벨{profileUser.user_level}</span>
      </div>
      <div>
      {userState.intra_id === intraId ?(<span className={styles.userUpdate}>회원정보 업데이트</span>):(null)}
      </div>
    </div>
  );

  const MyPageAvg = () => (
    <div className={styles.avg_container}>
      <div className={styles.avg_box}>
        <div className={styles.avg_number}>{unreviewedNumber}</div>
        <div className={styles.avg_title}>작성 가능한 리뷰</div>
      </div>
      <div className={styles.avg_box}>
        <div className={styles.avg_number}>
          {profileUser.cnt_comment
            ? profileUser.cnt_comment
            : 0}
        </div>
        <div className={styles.avg_title}>내 리뷰</div>
      </div>
      <div className={styles.avg_box}>
        <div className={styles.avg_number}>
          {profileUser.cnt_likes
            ? profileUser.cnt_likes
            : 0}
        </div>
        <div className={styles.avg_title}>좋아요한 리뷰</div>
      </div>
    </div>
  );

  return (
    <div className={styles.containerMain}>
      <Menu menuName={menuName} />
      <div className={styles.container}>
        <UserState />
        {menuName === '마이페이지' && <MyPageAvg />}
      </div>
      <div className={styles.tab}>
        <button
          onClick={() => setContentState('writeableComment')}
          className={
            contentState === 'writeableComment'
              ? styles.tabBtn
              : styles.tabBtnNo
          }
        >
          {userState.intra_id === intraId ? '작성 가능한 리뷰' : '완료한 과제'}
        </button>
        <button
          onClick={() => setContentState('myComment')}
          className={
            contentState === 'myComment' ? styles.tabBtn : styles.tabBtnNo
          }
        >
          {menuName === '마이페이지'
            ? '내가 작성한 리뷰'
            : `작성한 리뷰 ${
                profileUser.cnt_comment
                  ? profileUser.cnt_comment
                  : 0
              }`}
        </button>
        {menuName === '마이페이지' && (
          <button
            onClick={() => setContentState('likeComment')}
            className={
              contentState === 'likeComment' ? styles.tabBtn : styles.tabBtnNo
            }
          >
            좋아요한 리뷰
          </button>
        )}
      </div>
      <div className={styles.contentBox}>
        {contentState === 'writeableComment' && (
          <WriteableList subject={unreviewed} intra_id={intraId} />
        )}
        {contentState === 'myComment' && (
          <CommentList comments={myComments} isLikeComment={false} />
        )}
        {contentState === 'likeComment' && menuName === '마이페이지' && (
          <CommentList comments={likeComments} isLikeComment={true} />
        )}
      </div>
      {userState.intra_id === intraId ? (<div className={styles.logout} onClick={onClick}>
          로그아웃
      </div>):(null)
      }
    </div>
  );
}
