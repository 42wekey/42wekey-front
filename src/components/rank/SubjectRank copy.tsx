import { useEffect, useState } from "react";

interface SubjectStarRatingRank {
  subject_name: String;
  star_rating: Number;
}

interface SubjectCommentNumRank {
  subject_name: String;
  commnet_num: Number;
}

interface SubjectStarRank {
  title: String;
  subject_1: SubjectStarRatingRank;
  subject_2: SubjectStarRatingRank;
  subject_3: SubjectStarRatingRank;
}

interface SubjectCommentRank {
  title: String;
  subject_1: SubjectCommentNumRank;
  subject_2: SubjectCommentNumRank;
  subject_3: SubjectCommentNumRank;
}

export default function SubjectRank() {
  const [subjectCommentRank, setSubjectCommentRank] =
    useState<SubjectCommentRank>();
  const [subjectStarRank, setSubjectStarRank] = useState<SubjectStarRank>();
  const [selectRank, setSelectRank] = useState("star_rating_rank");
  const rankList = ["star_rating_rank", "comment_num_rank"];
  const [rankIndex, setRankIndex] = useState(0);

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

  function rankIndexPlus() {
    if (rankIndex < 1) {
      setRankIndex(rankIndex + 1);
      console.log(rankIndex);
    } else {
      setRankIndex(0);
      console.log(rankIndex);
    }
  }
  function rankIndexMinus() {
    if (rankIndex > 0) {
      setRankIndex(rankIndex - 1);
      console.log(rankIndex);
    } else {
      setRankIndex(1);
      console.log(rankIndex);
    }
  }

  useEffect(() => {
    fetch(`http://localhost:3001/subject_star_rating_rank`)
      .then((res) => res.json())
      .then((data) => setSubjectStarRank(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/subject_comment_num_rank`)
      .then((res) => res.json())
      .then((data) => setSubjectCommentRank(data));
  }, []);

  return (
    <div>
      <div>
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
      </div>
      <div>
        <button onClick={rankIndexMinus}> {"<"}</button>
        <button onClick={rankIndexPlus}> {">"} </button>
      </div>
    </div>
  );
}

