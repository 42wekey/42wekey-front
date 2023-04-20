import styles from "./CommentInputModal.module.css";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import ClearIcon from "@mui/icons-material/Clear";
import { modal, modalState } from "../../utils/recoil/modal";
import { ReactComponent as EmptyStar } from "../../emptyStar.svg";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;

interface subject {
  subject: string;
}

export default function CommentInputModal() {
  const [star_rating, setRating] = useState<number>(0);
  const [time_taken, setElapsed] = useState("");
  const [amount_study, setAmountStudy] = useState("");
  const [difficulty, setDiffi] = useState("");
  const [bonus, setBonus] = useState("");
  const [content, setContent] = useState("");
  const [isSubmit, setIsSubmit] = useState<Boolean>(false);
  const [isCommentModal, setIsCommentModal] = useRecoilState(modal);
  const [rate, setRate] = useState<number>(0);

  const time_taken_data = [
    { id: 0, content: "일주일 이하", value: "a_week" },
    { id: 1, content: "1~2주 이내", value: "tow_week" },
    { id: 2, content: "3~4주 이내", value: "three_week" },
    { id: 3, content: "1개월 이상", value: "a_month" },
    { id: 4, content: "3개월 이상", value: "three_month" },
  ];

  const difficulty_data = [
    { id: 0, content: "쉬워요", value: "easy" },
    { id: 1, content: "보통이에요", value: "normal" },
    { id: 2, content: "어려워요", value: "hard" },
  ];

  const amount_study_data = [
    { id: 0, content: "적은 편이에요", value: "low" },
    { id: 1, content: "보통이에요", value: "middle" },
    { id: 2, content: "많은 편이에요", value: "high" },
  ];
  // >
  //   <ToggleButton value="no">안 했어요</ToggleButton>
  //   <ToggleButton value="little">하긴 했어요</ToggleButton>
  //   <ToggleButton value="complete">다 했어요</ToggleButton>

  const bonus_data = [
    { id: 0, content: "안 했어요", value: "no" },
    { id: 1, content: "하긴 했어요", value: "little" },
    { id: 2, content: "다 했어요", value: "complete" },
  ];

  // const history = useHistory();
  // useEffect(() => {
  //   console.log(content);
  // }, [content]);

  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(false);
    }
    time_taken &&
      amount_study &&
      difficulty &&
      bonus &&
      content.length >= 10 &&
      star_rating &&
      setIsSubmit(true);
  }, [time_taken, amount_study, difficulty, bonus, content, star_rating]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  function handleChangeTakeTime(i: number) {
    setElapsed(time_taken_data[i].value);
  }

  function handleChangeAmountStudy(i: number) {
    setAmountStudy(amount_study_data[i].value);
  }

  function handleChangeDifficulty(i: number) {
    setDiffi(difficulty_data[i].value);
  }

  function handleChangeBonus(i: number) {
    setBonus(bonus_data[i].value);
  }

  const onClickSubmit = () => {
    if (isSubmit) {
      fetch(`${baseUrl}/comments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intraid: "sooyang",
          sbj_name: isCommentModal.commentInput?.subjectName,
          star_rating,
          time_taken,
          difficulty,
          amount_study,
          bonus,
          content,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("후기가 작성되었습니다.");
          document.body.style.overflow = "unset";
          // history.push("/");
        }
      });
      setIsCommentModal({ modalName: null });
    } else {
      alert("내용을 확인해주세요");
    }
  };

  function onCancleButton() {
    document.body.style.overflow = "unset";
    setIsCommentModal({ modalName: null });
  }

  const StarRating = () => {
    const [hovered, setHovered] = useState(false);
    return (
      <div className={styles.starRating}>
        <form id="starRate" className={styles.starRate}>
          <fieldset>
            <label
              htmlFor="rate1"
              onClick={() => setRating(1)}
            >
              <EmptyStar
                fill={star_rating > 0 ? "#FEDB22" : "#F9F9F9"}
                stroke={star_rating > 0 ? "#FEDB22" : "#E8E8E8"}
                className={styles.star}
              />
            </label>
            <input
              type="radio"
              name="rating"
              value="1"
              id="rate1"
              tabIndex={-1}
            />
            <label
              htmlFor="rate2"
              onClick={() => setRating(2)}
            >
              <EmptyStar
                fill={star_rating > 1 ? "#FEDB22" : "#F9F9F9"}
                stroke={star_rating > 1 ? "#FEDB22" : "#E8E8E8"}
                className={styles.star}
              />
            </label>
            <input
              type="radio"
              name="rating"
              value="2"
              id="rate2"
              tabIndex={-1}
            />
            <label
              htmlFor="rate3"
              onClick={() => setRating(3)}
            >
              <EmptyStar
                fill={star_rating > 2 ? "#FEDB22" : "#F9F9F9"}
                stroke={star_rating > 2 ? "#FEDB22" : "#E8E8E8"}
                className={styles.star}
              />
            </label>
            <input
              type="radio"
              name="rating"
              value="3"
              id="rate3"
              tabIndex={-1}
            />
            <label
              htmlFor="rate4"
              onClick={() => setRating(4)}
            >
              <EmptyStar
                fill={star_rating > 3 ? "#FEDB22" : "#F9F9F9"}
                stroke={star_rating > 3 ? "#FEDB22" : "#E8E8E8"}
                className={styles.star}
              />
            </label>
            <input
              type="radio"
              name="rating"
              value="4"
              id="rate4"
              tabIndex={-1}
            />
            <label
              htmlFor="rate5"
              onClick={() => setRating(5)}
            >
              <EmptyStar
                fill={star_rating > 4 ? "#FEDB22" : "#F9F9F9"}
                stroke={star_rating > 4 ? "#FEDB22" : "#E8E8E8"}
              />
            </label>
            <input
              type="radio"
              name="rating"
              value="5"
              id="rate5"
              tabIndex={-1}
            />
          </fieldset>
        </form>
      </div>
    );
  };

  return (
    <div className={styles.back}>
      <div className={styles.front}>
        <div className={styles.title}>
          <div className={styles.titleName}>리뷰 작성</div>
          <div className={styles.closeBtn} onClick={onCancleButton}>
            <ClearIcon />
          </div>
        </div>
        <div className={styles.subjectTitle}>
          <span className={styles.circle}>
            {isCommentModal.commentInput?.circle}Circle
          </span>
          <span className={styles.subjectName}>
            {" "}
            {isCommentModal.commentInput?.subjectName}
          </span>
        </div>
        <div className={styles.divisionLine}></div>
        <div className={styles.contentBox}>
          <div className={styles.margin}>
            <span className={styles.Q}>Q. </span>과제를 해결하는데 얼마나
            걸리셨나요?
          </div>
          <div className={styles.answerBox}>
            {time_taken_data.map((data, i) => (
              <button
                className={
                  data.value === time_taken
                    ? styles.selectAnswer
                    : styles.answer
                }
                onClick={() => handleChangeTakeTime(i)}
                key={i}
              >
                {data.content}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.margin}>
            <span className={styles.Q}>Q. </span>난이도는 어땠나요?
          </div>
          <div className={styles.answerBox}>
            {difficulty_data.map((data, i) => (
              <button
                className={
                  data.value === difficulty
                    ? styles.selectAnswer
                    : styles.answer
                }
                onClick={() => handleChangeDifficulty(i)}
                key={i}
              >
                {data.content}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.margin}>
            <span className={styles.Q}>Q. </span>과제 해결을 위해 공부한 양은
            얼마나 되나요?
          </div>
          <div className={styles.answerBox}>
            {amount_study_data.map((data, i) => (
              <button
                className={
                  data.value === amount_study
                    ? styles.selectAnswer
                    : styles.answer
                }
                onClick={() => handleChangeAmountStudy(i)}
                key={i}
              >
                {data.content}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.margin}>
            <span className={styles.Q}>Q. </span>보너스를 해결하셨나요?
          </div>
          <div className={styles.answerBox}>
            {bonus_data.map((data, i) => (
              <button
                className={
                  data.value === bonus ? styles.selectAnswer : styles.answer
                }
                onClick={() => handleChangeBonus(i)}
                key={i}
              >
                {data.content}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.margin}>
            <span className={styles.Q}>Q. </span>평점과 자세한 후기를
            남겨주실래요?
          </div>
          <span className={styles.starRating}>
            <StarRating />
          </span>
          <textarea
            className={styles.inputString}
            onChange={(e) => setContent(e.target.value)}
            placeholder="최소 10자 이상 작성해주세요."
            maxLength={1000}
          ></textarea>
          <div className={styles.limitWord}>{content.length} / 1000자</div>
        </div>
        <span className={styles.announce}>• 등록한 리뷰는 수정할 수 있어요.</span>
        <div className={styles.submit}>
          <button onClick={onClickSubmit} className={styles.submitBtn}>
            완료
          </button>
        </div>
        <></>
      </div>
    </div>
  );
}
