import { useEffect, useState } from "react";

interface RankSubject {
  subject_name: String;
  value: Number | String;
}

interface Rank {
  title: String;
  subject_1: RankSubject;
  subject_2: RankSubject;
  subject_3: RankSubject;
}

export default function SubjectRank() {
  const [subjectRank, setSubjectRank] = useState<Rank[]>([]);
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
      setRankIndex(subjectRank.length - 1);
      console.log(rankIndex);
    }
  }

  useEffect(() => {
    fetch(`http://localhost:3001/subject_rank`)
      .then((res) => res.json())
      .then((data) => setSubjectRank(data));
  }, []);

  return (
    <div>
      <div>
        <>
          {subjectRank[rankIndex]?.title}
          <div>
            <>
              1. {subjectRank[rankIndex]?.subject_1.subject_name}
              {" - "}
              {subjectRank[rankIndex]?.subject_1.value}
            </>
          </div>
          <div>
            <>
              2. {subjectRank[rankIndex]?.subject_2.subject_name}
              {" - "}
              {subjectRank[rankIndex]?.subject_2.value}
            </>
          </div>
          <div>
            <>
              3. {subjectRank[rankIndex]?.subject_3.subject_name}
              {" - "}
              {subjectRank[rankIndex]?.subject_3.value}
            </>
          </div>
        </>
      </div>
      <div>
        <button onClick={rankIndexMinus}> {"<"}</button>
        <button onClick={rankIndexPlus}> {">"} </button>
      </div>
    </div>
  );
}
