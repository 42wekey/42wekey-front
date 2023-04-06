import { useEffect, useState } from "react";
import SubjectRankContent from "./SubjectRankContent";

interface SubjectRankType {
  subject_name: String;
  value1: Number | String;
  value2: Number | String;
}

interface SubjectRank {
  title: String;
  subject: SubjectRankType[];
}

export default function SubjectRank() {
  const [subjectRank, setSubjectRank] = useState<SubjectRank[]>([]);
  // const [selectRank, setSelectRank] = useState("star_rating_rank");
  // const rankList = ["star_rating_rank", "comment_num_rank"];
  const [rankIndex, setRankIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  function rankIndexPlus() {
    if (rankIndex === maxIndex - 1) {
      setRankIndex(0);
    } else {
      setRankIndex(rankIndex + 1);
    }
  }
  function rankIndexMinus() {
    if (rankIndex == 0)
      setRankIndex(maxIndex - 1);
    else
      setRankIndex(rankIndex - 1);
  }

  useEffect(() => {
    fetch(`http://localhost:3001/subject_rank`)
      .then((res) => res.json())
      .then((data) => setSubjectRank(data));
      setMaxIndex(subjectRank.length);
  }, []);

  return (
    <div>
      <div>
        <SubjectRankContent
          title={subjectRank[rankIndex]?.title}
          subject={subjectRank[rankIndex]?.subject}
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
      <div>
        <button onClick={rankIndexMinus}> {"<"}</button>
        <button onClick={rankIndexPlus}> {">"} </button>
      </div>
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
