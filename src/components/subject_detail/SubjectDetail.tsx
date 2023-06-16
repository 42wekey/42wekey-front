import styles from './SubjectDetail.module.css';

import SubjectComment from './SubjectComment';
import Menu from '../menu/Menu';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import SubjectWiki from './SubjectWiki';
import SubjectInfo from './SubjectInfo';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileState } from '../../utils/recoil/user';
import { modal, modalState } from '../../utils/recoil/modal';
import {} from './SubjectComment';
import Analysis from './SubjectAnalysis';
import { instance } from '../../utils/axios';
import { errorState } from '../../utils/recoil/error';
import { redirect, useNavigate } from 'react-router';

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface wiki {
  id?: number;
  content: string;
}

interface description {
  subject_description: string;
}

export default function SubjectDetail() {
  const [wiki, setWiki] = useState<wiki>();
  const [isWikiEdit, setIsWikiEdit] = useState<Boolean>(false);
  const [subjectDescription, setSubjectDescription] = useState<description>();
  const [scroll, setScroll] = useState(0);
  const maxScroll = getMaxScroll();
  const [{ modalName }, setModal] = useRecoilState(modal);
  const [contentState, setContentState] = useState('wiki');
  const [comment, setComment] = useState([]);
  const [error, setError] = useRecoilState(errorState);
  const navigate = useNavigate();

  function getMaxScroll() {
    const { scrollHeight, offsetHeight } = document.documentElement;
    return Math.max(scrollHeight, offsetHeight) - window.innerHeight;
  }
  const params = useParams() as { circle: string; sbj_name: string };
  const sbj: string = params.sbj_name;

  function onScroll() {
    setScroll(Math.floor(window.scrollY));
  }

  const getWikiContent = async () => {
    try {
      const res = await instance.get(`/subjects/${sbj}/wiki`);
      setWiki(res.data);
    } catch (e) {
      setError('123');
      navigate('/error');
    }
  };

  useEffect(() => {
    getWikiContent();
  }, [isWikiEdit]);

  const getCommentContent = async () => {
    try {
      const res = await instance.get(`/comments/${sbj}`);
      setComment(res.data);
    } catch (e) {
      setError('123');
      navigate('/error');
    }
  };

  const getSubjectDescription = async () => {
    try {
      const res = await instance.get(`/subjects/${sbj}/description`);
      setSubjectDescription(res.data);
      console.log(subjectDescription);
    } catch (e) {
      setError('description error');
      navigate('/error');
    }
  };

  useEffect (() => {
    getSubjectDescription();
  }, []);

  useEffect(() => {
    getCommentContent();
  }, [modalName]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [scroll]);

  return (
    <div>
      <Menu menuName={'과제리뷰'} />
      <div className={styles.subtitle}>{params.sbj_name}</div>
      <div className={styles.SubjectInfo}>{subjectDescription?.subject_description}</div>
      <div className={styles.headline} />
      <div>
        {contentState === 'wiki' ? (
          <div>
            <div className={styles.tab}>
              <div
                className={styles.tab_select_btn}
                onClick={() => setContentState('wiki')}
              >
                위키42
              </div>
              <div
                className={styles.tab_btn}
                onClick={() => {setContentState('subject'); setIsWikiEdit(false);}}
              >
                과제 후기
              </div>
            </div>
            <div className={styles.SubjectWiki}>
              {isWikiEdit ? (
                <div>
                  <SubjectWiki
                    setIsWikiEdit={setIsWikiEdit}
                    content={wiki?.content}
                    id={wiki?.id}
                  />
                </div>
              ) : (
                <div>
                  <div className={styles.wikiContent}>
                    {wiki?.content && (
                      <div
                        className={styles.wikiContent}
                        dangerouslySetInnerHTML={{ __html: wiki.content }}
                      />
                    )}
                  </div>
                  {/* {wiki?.wikiContent} */}
                  <button
                    className={styles.btn}
                    onClick={() => setIsWikiEdit(true)}
                  >
                    수정하기
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.tab}>
              <div
                className={styles.tab_btn}
                onClick={() => setContentState('wiki')}
              >
                위키42
              </div>
              <div
                className={styles.tab_select_btn}
                onClick={() => setContentState('subject')}
              >
                과제 후기
              </div>
            </div>
            <Analysis sbjname={sbj} />
            <div className={styles.headline} />
            <div className={styles.content}>
              <SubjectComment comments={comment} />
              <div className={styles.editBtnContainer}>
                <button
                  onClick={() =>
                    setModal({
                      modalName: 'commentInput',
                      commentInput: {
                        subjectName: params.sbj_name,
                        circle: parseInt(params.circle),
                      },
                    })
                  }
                  className={styles.editBtn}
                >
                  후기 작성
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
