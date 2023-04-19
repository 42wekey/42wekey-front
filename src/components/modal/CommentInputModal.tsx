import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import MyFormHelperText from "@mui/material/FormHelperText";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./CommentInputModal.module.css";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { modal, modalState } from "../../utils/recoil/modal";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;

interface subject {
  subject: string;
}

export default function CommentInputModal() {
  const [star_rating, setRating] = useState<number | null>(null);
  const [time_taken, setElapsed] = useState("");
  const [amount_study, setAmountStudy] = useState("");
  const [difficulty, setDiffi] = useState("");
  const [bonus, setBonus] = useState("");
  const [content, setContent] = useState("");
  const [isSubmit, setIsSubmit] = useState<Boolean>(false);
  const [isCommentModal, setIsCommentModal] = useRecoilState(modal);
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
      content &&
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

  return (
    <div className={styles.back}>
      <div className={styles.front}>
        <div>
          리뷰 작성<a>X</a>
        </div>
        <div className={styles.subjectTitle}>
          <span className={styles.circle}>{isCommentModal.commentInput?.circle}Circle</span>
          <span className={styles.subjectName}> {isCommentModal.commentInput?.subjectName}</span>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.margin}>
            <span className={styles.Q}>Q. </span>과제를 해결하는데 얼마나 걸리셨나요?
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
          <div className={styles.margin}><span className={styles.Q}>Q. </span>난이도는 어땠나요?</div>
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
          <span className={styles.Q}>Q. </span>과제 해결을 위해 공부한 양은 얼마나 되나요?
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
          <div className={styles.margin}><span className={styles.Q}>Q. </span>보너스를 해결하셨나요?</div>
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
          <div className={styles.margin}><span className={styles.Q}>Q. </span>평점과 자세한 후기를 남겨주실래요?</div>
          <div className={styles.answerBox}>
                <input type="text"></input>
          </div>
        </div>
        <div className={styles.submit}>
          <Button variant="outlined" onClick={onCancleButton}>
            취소
          </Button>
          <Button variant="contained" onClick={onClickSubmit}>
            제출
          </Button>
        </div>
      </div>
    </div>
  );
}
