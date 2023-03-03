import styles from "./SubjectDetail.module.css";
import SubjectHeader from "./SubjectHeader";
import SubjectComment from "./SubjectComment";
import Menu from "../menu/Menu";
import CommentInput from "../comment_input/CommentInput";
import { useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import SubjectWiki from "./SubjectWiki";
import dummy from "../../db/data.json";
import SubjectInfo from "./SubjectInfo";
import Graph from "../graph/Graph";
import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import {profileState} from "../../utils/recoil/user"

interface intraId {
  intraId: String;
}

export default function SubjectDetail() {
  const wiki = dummy.wiki;
  const [isWikiEdit, setIsWikiEdit] = useState<Boolean>(false);
  const [userState, setProfileState] = useRecoilState(profileState);
  const [scroll, setScroll] = useState(0);
  const maxScroll = getMaxScroll();

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
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scroll]);

  return (
    <div >
      <Menu intraId={"him"} />
      <div className={styles.progress_bar}>
        <div
          className={styles.progerss_bar_fill}
          style={{ width: `${100 * (scroll / maxScroll)}%` }}
        ></div>
              </div>
              <div className={styles.subject}>
              <div className={styles.subjectDetail}>
      <SubjectHeader
        info={{ circle: params.circle, sbj_name: params.sbj_name }}
      />
      <div>
        <SubjectInfo />
      </div>
      <div className={styles.SubjectWiki}>
        {isWikiEdit ? (
          <div>
            <SubjectWiki
              setIsWikiEdit={setIsWikiEdit}
              content={wiki.wikiContent}
              version={wiki.version}
            />
          </div>
        ) : (
          <div>
            {wiki.wikiContent}
            <button onClick={() => setIsWikiEdit(true)}>수정하기</button>
          </div>
        )}
      </div>
      <div className={styles.content}>
          <CommentInput subject={sbj}/>
          <SubjectComment/>
          </div>
        </div>
      </div>
      </div>
  );
}
