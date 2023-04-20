import styles from "./SubjectDetail.module.css";

import SubjectComment from "./SubjectComment";
import Menu from "../menu/Menu";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import SubjectWiki from "./SubjectWiki";
import SubjectInfo from "./SubjectInfo";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profileState } from "../../utils/recoil/user";
import { modal, modalState } from "../../utils/recoil/modal";
import {} from "./SubjectComment";
import Analysis from "./SubjectAnalysis";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface wiki {
  wikiContent?: string;
  version?: number;
}

export default function SubjectDetail() {
  const [wiki, setWiki] = useState<wiki>();
  const [isWikiEdit, setIsWikiEdit] = useState<Boolean>(false);
  const [userState, setProfileState] = useRecoilState(profileState);
  const [scroll, setScroll] = useState(0);
  const maxScroll = getMaxScroll();
  const [{modalName}, setModal] = useRecoilState(modal);
  // const setModal = useSetRecoilState(modal);
  const [contentState, setContentState] = useState("wiki");
  const [comment, setComment] = useState([]);

  function getMaxScroll() {
    const { scrollHeight, offsetHeight } = document.documentElement;
    return Math.max(scrollHeight, offsetHeight) - window.innerHeight;
  }
  const params = useParams() as { circle: string; sbj_name: string }; //params  = {subject : sbj_name}
  // const {circle, sbj_name} = params
  const sbj: string = params.sbj_name;

  function onScroll() {
    setScroll(Math.floor(window.scrollY));
  }

  useEffect(() => {
    fetch(`${baseUrl}/wiki`)
      .then((res) => res.json())
      .then((data) => setWiki(data));
  }, [isWikiEdit]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scroll]);

  useEffect(() => {
    fetch(`${baseUrl}/comments`)
      .then((res) => res.json())
      .then((data) => setComment(data));
  }, [modalName]);

  function modalHandler () {
    setModal({modalName: "commentInput", commentInput:{subjectName: params.sbj_name, circle: parseInt(params.circle)}})
  }

  return (
    <div>
      <Menu intraId={userState.intraId} menuName={"과제리뷰"} />
      <div className={styles.subtitle}>{params.sbj_name}</div>
      <SubjectInfo />
      <div className={styles.headline} />
      <Analysis sbjname={sbj} />
      <div className={styles.headline} />
      <div>
        {contentState === "wiki" ? (
          <div>
            <div className={styles.tab}>
              <div
                className={styles.tab_select_btn}
                onClick={() => setContentState("wiki")}
              >
                위키42
              </div>
              <div
                className={styles.tab_btn}
                onClick={() => setContentState("subject")}
              >
                과제 후기
              </div>
            </div>

            <div className={styles.SubjectWiki}>
              {isWikiEdit ? (
                <div>
                  <SubjectWiki
                    setIsWikiEdit={setIsWikiEdit}
                    content={wiki?.wikiContent}
                    version={wiki?.version}
                  />
                </div>
              ) : (
                <div>
                  <div className={styles.wikiContent}>
                    {wiki?.wikiContent && (
                      <div
                        className={styles.wikiContent}
                        dangerouslySetInnerHTML={{ __html: wiki.wikiContent }}
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
                onClick={() => setContentState("wiki")}
              >
                위키42
              </div>
              <div
                className={styles.tab_select_btn}
                onClick={() => setContentState("subject")}
              >
                과제 후기
              </div>
            </div>
            <div className={styles.content}>
              <SubjectComment comments={comment} />
              <div className={styles.editBtnContainer}>
                <button
                  onClick={() => setModal({modalName: "commentInput", commentInput:{subjectName:params.sbj_name, circle:parseInt(params.circle) } })}
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
