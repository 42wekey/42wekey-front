import styles from "./SubjectDetail.module.css";
import SubjectHeader from "./SubjectHeader";
import SubjectComment from "./SubjectComment";
import Menu from "../menu/Menu";
import CommentInput from "../comment_input/CommentInput";
import { useParams } from "react-router";

export default function SubjectDetail() {
  const params = useParams()as {circle: string, sbj_name: string}; //params  = {subject : sbj_name}
  // const {circle, sbj_name} = params
  console.log(params)
  return (
    <div className={styles.pdf}>
      <Menu />
      <SubjectHeader
      info={{circle: params.circle, sbj_name: params.sbj_name}}
      />
      <div className={styles.content}>
      <CommentInput />
      <SubjectComment />
      </div>
    </div>
  );
}
