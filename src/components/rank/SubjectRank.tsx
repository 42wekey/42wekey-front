import styles from "./SubjectRank.module.css";
import { useEffect, useState } from "react";
import SubjectRankContent from "./SubjectRankContent";
import { instance } from "../../utils/axios";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { errorState } from "../../utils/recoil/error";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;

interface SubjectRankType {
  subject_name: string;
  circle: Number;
  star_rating: Number;
}

interface SubjectRank {
  title: string;
  rank: SubjectRankType[];
}

export default function SubjectRank() {
  const [subjectRankList, setSubjectRankList] = useState<SubjectRank[]>([]);
  // const [selectRank, setSelectRank] = useState("star_rating_rank");
  // const rankList = ["star_rating_rank", "comment_num_rank"];
  const [rankIndex, setRankIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [error, setError] = useRecoilState(errorState);
  const navigate = useNavigate();

  // function rankIndexPlus() {
  //   if (rankIndex === maxIndex - 1) {
  //     setRankIndex(0);
  //   } else {
  //     setRankIndex(rankIndex => rankIndex + 1);
  //     console.log(rankIndex);
  //     setRankIndex(rankIndex => rankIndex + 1);
  //     console.log(rankIndex);
  //   }
  // }

  // function rankIndexMinus() {
  //   if (rankIndex === 0) setRankIndex(maxIndex - 1);
  //   else setRankIndex(rankIndex => rankIndex - 1);
  // }

  useEffect(() => {
    setMaxIndex(subjectRankList.length);
  }, [subjectRankList]);

  useEffect(() => {
    fetch(`${baseUrl}/subject/rank`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("42ence-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSubjectRankList(data));
  }, []);

  const getSubjectRank = async () => {
    try {
      const res = await instance.get(`/subject/rank`);
      setSubjectRankList(res.data);
    } catch (e) {
      setError('SubjectRank');
      navigate("/error");
    }
  };

  useEffect(() => {
    getSubjectRank();
  }, [error]);

  return (
    <div>
      <div className={styles.rankContainer}>
        <div className={styles.rankTitle}>카뎃들의 과제 랭킹 👀️</div>
        <div className={styles.keyword}>
        {subjectRankList?.map((value, index) => (
          <div key={index} className={`${rankIndex === index ? styles.selectKeyword : styles.keywordContent}`} onClick={()=>setRankIndex(index)}>
          <a >{value.title}</a>
          </div>
        ))}
        </div>
        <SubjectRankContent
          title={subjectRankList[rankIndex]?.title}
          rank={subjectRankList[rankIndex]?.rank}
        />
      </div>
      {/* <div>
        {rankIndex === 0 ? (
          <div>
            <>
              <div>{subjectStarRank?.title}</div>
              <div>
                <>
                  1. {subjectStarRank?.subject_1.subject_name}
                  {" - "}
                  {subjectStarRank?.subject_1.star_rating}
                </>
              </div>
              <div>
                <>
                  2. {subjectStarRank?.subject_2.subject_name}
                  {" - "}
                  {subjectStarRank?.subject_2.star_rating}
                </>
              </div>
              <div>
                <>
                  3. {subjectStarRank?.subject_3.subject_name}
                  {" - "}
                  {subjectStarRank?.subject_3.star_rating}
                </>
              </div>
            </>
          </div>
        ) : (
          <div>
            <>
              <div>{subjectCommentRank?.title}</div>
              <div>
                <>
                  1. {subjectCommentRank?.subject_1.subject_name}
                  {" - "}
                  {subjectCommentRank?.subject_1.commnet_num}
                </>
              </div>
              <div>
                <>
                  2. {subjectCommentRank?.subject_2.subject_name}
                  {" - "}
                  {subjectCommentRank?.subject_2.commnet_num}
                </>
              </div>
              <div>
                <>
                  3. {subjectCommentRank?.subject_3.subject_name}
                  {" - "}
                  {subjectCommentRank?.subject_3.commnet_num}
                </>
              </div>
            </>
          </div>
        )}
      </div> */}
      {/* <div>
        <button onClick={rankIndexMinus}> {"<"}</button>
        <button onClick={rankIndexPlus}> {">"} </button>
      </div> */}
    </div>
  );
}

//   useEffect(() => {
//     if (selectRank === "subject_star_rating_rank") {
//       fetch(`http://localhost:3001/${selectRank}`)
//         .then((res) => res.json())
//         .then((data) => setSubjectStarRank(data));
//     }
// 	else if (selectRank === "subject_comment_num_rank"){
// 		fetch(`http://localhost:3001/${selectRank}`)
//         .then((res) => res.json())
//         .then((data) => setSubjectCommentRank(data));
// 	}
//   }, [selectRank]);

