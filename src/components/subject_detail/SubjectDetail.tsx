import styles from "./SubjectDetail.module.css";
import SubjectHeader from "./SubjectHeader";
import SubjectComment from "./SubjectComment";
import Menu from "../menu/Menu";
import CommentInput from "../comment_input/CommentInput";
import { useParams } from "react-router";
import { useEffect } from "react";
import SubjectWiki from "./SubjectWiki";
import SubjectInfo from "./SubjectInfo";
import Graph from "../graph/Graph";

interface intraId{
  intraId:String;
}

export default function SubjectDetail({intraId}:intraId) {
  const params = useParams()as {circle: string, sbj_name: string}; //params  = {subject : sbj_name}
  // const {circle, sbj_name} = params
  useEffect(()=>{
    console.log(params)
  },[])
  
  return (
    <div className={styles.pdf}>
      <Menu 
      intraId = {'him'}/>
      <SubjectHeader
      info={{circle: params.circle, sbj_name: params.sbj_name}}
      />
      <div>
      <SubjectInfo />
      </div>
      <div className={styles.SubjectWiki}>
      <SubjectWiki />
      </div>
      <div className={styles.content}>
      <CommentInput />
      <SubjectComment 
      intraId={intraId}/>
      </div>
      <div>
        <Graph time_taken="a_week" difficulty="normal" amount_study="middle" /> 
      </div>
    </div>
  );
}
