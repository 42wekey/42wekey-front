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
import { modalState } from "../../utils/recoil/modal";

// import { useHistory } from "react-router-dom";
interface subject {
  subject: string;
}

export default function CommentInputModal({subject}:subject) {
  const [star_rating, setRating] = useState<number | null>(null);
  const [time_taken, setElapsed] = useState("");
  const [amount_study, setAmountStudy] = useState("");
  const [difficulty, setDiffi] = useState("");
  const [bonus, setBonus] = useState("");
  const [content, setContent] = useState("");
  const [isCommentModal, setIsCommentModal] = useRecoilState(modalState)

  // const history = useHistory();
    // useEffect(() => {
    //   console.log(content);
    // }, [content]);

  const handleChangeTime = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setElapsed(newAlignment);
  };

  const handleChangeAmount = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAmountStudy(newAlignment);
  };

  const handleChangeDiffi = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setDiffi(newAlignment);
  };

  const handleChangeBonus = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setBonus(newAlignment);
  };

  const onClickSubmit = () => {
    fetch("http://localhost:3001/comments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intraid: "him",
        sbj_name: subject,
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
        // history.push("/");
      }
    });
    setIsCommentModal({ isModal: false });
  };

  function onCancleButton() {
    setIsCommentModal({ isModal: false });
  }

  return (
    <div className={styles.back}>
    <Card>
      <CardContent>
        <form>
          <div className={styles.margin}>
            과제를 해결하는데 얼마나 걸리셨나요?
          </div>
          <ToggleButtonGroup
            className={styles.boxmargin}
            color="primary"
            value={time_taken}
            exclusive
            onChange={handleChangeTime}
            aria-label="Platform"
          >
            <ToggleButton value="a_week">일주일 이하</ToggleButton>
            <ToggleButton value="two_week">1~2주 이내</ToggleButton>
            <ToggleButton value="three_week">3~4주 이내</ToggleButton>
            <ToggleButton value="a_month">한 달 이상</ToggleButton>
            <ToggleButton value="three_month">세 달 이상</ToggleButton>
          </ToggleButtonGroup>
          <div className={styles.margin}>과제의 난이도는 어땠나요?</div>
          <ToggleButtonGroup
            className={styles.boxmargin}
            color="primary"
            value={difficulty}
            exclusive
            onChange={handleChangeDiffi}
            aria-label="Platform"
          >
            <ToggleButton value="easy">쉬워요</ToggleButton>
            <ToggleButton value="normal">보통이에요</ToggleButton>
            <ToggleButton value="hard">어려워요</ToggleButton>
          </ToggleButtonGroup>
          <div className={styles.margin}>
            과제를 해결하기 위해 공부한 양은 얼마나 되나요?
          </div>
          <ToggleButtonGroup
            className={styles.boxmargin}
            color="primary"
            value={amount_study}
            exclusive
            onChange={handleChangeAmount}
            aria-label="Platform"
          >
            <ToggleButton value="low">적은 편이에요</ToggleButton>
            <ToggleButton value="middle">보통이에요</ToggleButton>
            <ToggleButton value="high">많아요</ToggleButton>
          </ToggleButtonGroup>
          <div className={styles.margin}>이 과제의 보너스를 해결하셨나요?</div>
          <ToggleButtonGroup
            className={styles.boxmargin}
            color="primary"
            value={bonus}
            exclusive
            onChange={handleChangeBonus}
            aria-label="Platform"
          >
            <ToggleButton value="no">안 했어요</ToggleButton>
            <ToggleButton value="little">하긴 했어요</ToggleButton>
            <ToggleButton value="complete">다 했어요</ToggleButton>
          </ToggleButtonGroup>
          <div className={styles.boxmargin}>
            <div className={`${styles.margin && styles.flex}`}>
              <span className={styles.inlinetext}>총 평점</span>
              <Rating
                size="large"
                className={styles.margin}
                name="simple-controlled"
                value={star_rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
            <TextField
              id="outlined-multiline-static"
              label="후기"
              multiline
              rows={4}
              placeholder="과제에 대한 후기를 남겨주세요."
              style={{ width: "100%", height: "120px" }}
              onChange={(e) => setContent(e.target.value)}
            />
            <MyFormHelperText />
          </div>
          <div className={styles.submit}>
            <Button variant="outlined" onClick={onCancleButton}>취소</Button>
            <Button variant="contained" onClick={onClickSubmit}>
              제출
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  );
}
