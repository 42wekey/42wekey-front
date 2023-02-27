import styles from "./SubjectDetail.module.css";
import SubjectHeader from "./SubjectHeader";
import SubjectComment from "./SubjectComment";
import Menu from "../menu/Menu";
import CommentInput from "../comment_input/CommentInput";
import { useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import SubjectWiki from "./SubjectWiki";
import SubjectInfo from "./SubjectInfo";
import Graph from "../graph/Graph";

interface intraId {
  intraId: String;
}

export default function SubjectDetail({ intraId }: intraId) {
  const [scroll, setScroll] = useState(0);
  const maxScroll = getMaxScroll();

  function getMaxScroll() {
    const { scrollHeight, offsetHeight } = document.documentElement;
    return Math.max(scrollHeight, offsetHeight) - window.innerHeight;
  }
  const params = useParams() as { circle: string; sbj_name: string }; //params  = {subject : sbj_name}
  // const {circle, sbj_name} = params

  function onScroll() {
    setScroll(Math.floor(window.scrollY));
  }

  useEffect(() => {
    console.log("ScrollY is ", scroll); // ScrollY가 변화할때마다 값을 콘솔에 출력
  }, [scroll]);

  useEffect(() => {
    console.log(params);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scroll]);

  return (
    <div className={styles.pdf}>
      <Menu intraId={"him"} />
      <div className={styles.progress_bar}>
        <div
          className={styles.progerss_bar_fill}
          style={{ width: `${100 * (scroll / maxScroll)}%` }}
        ></div>
      </div>
      <div className={styles.container}>
        <SubjectHeader
          info={{ circle: params.circle, sbj_name: params.sbj_name }}
        />
        <div>
          <SubjectInfo />
        </div>
        <div className={styles.SubjectWiki}>
          <SubjectWiki />
        </div>
        <div className={styles.content}>
          <CommentInput />
          <SubjectComment intraId={intraId} />
        </div>
        <div>
          <Graph
            time_taken="two_week"
            difficulty="hard"
            amount_study="low"
          />
        </div>
      </div>
    </div>
  );
}
