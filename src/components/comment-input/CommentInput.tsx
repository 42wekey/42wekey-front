import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import MyFormHelperText from "@mui/material/FormHelperText";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./CommentInput.module.css";
import { useState } from "react";

export default function CommentInput() {
  const [value, setValue] = useState<number | null>(0);
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState("");
  const [diffi, setDiffi] = useState("");
  const [bonus, setBonus] = useState("");

  const handleChangeTime = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setTime(newAlignment);
  };

  const handleChangeAmount = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAmount(newAlignment);
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

  return (
    <Card>
      <CardContent>
        <form>
          <div className={styles.margin}>
            과제를 해결하는데 얼마나 걸리셨나요?
          </div>
          <ToggleButtonGroup
            className={styles.boxmargin}
            color="primary"
            value={time}
            exclusive
            onChange={handleChangeTime}
            aria-label="Platform"
          >
            <ToggleButton value="7">일주일 이하</ToggleButton>
            <ToggleButton value="14">1~2주 이내</ToggleButton>
            <ToggleButton value="21">3~4주 이내</ToggleButton>
            <ToggleButton value="30">한 달 이상</ToggleButton>
            <ToggleButton value="90">세 달 이상</ToggleButton>
          </ToggleButtonGroup>
          <div className={styles.margin}>과제의 난이도는 어땠나요?</div>
          <ToggleButtonGroup
            className={styles.boxmargin}
            color="primary"
            value={diffi}
            exclusive
            onChange={handleChangeDiffi}
            aria-label="Platform"
          >
            <ToggleButton value="쉬움">쉬워요</ToggleButton>
            <ToggleButton value="보통">보통이에요</ToggleButton>
            <ToggleButton value="어려움">어려워요</ToggleButton>
          </ToggleButtonGroup>
          <div className={styles.margin}>
            과제를 해결하기 위해 공부한 양은 얼마나 되나요?
          </div>
          <ToggleButtonGroup
            className={styles.boxmargin}
            color="primary"
            value={amount}
            exclusive
            onChange={handleChangeAmount}
            aria-label="Platform"
          >
            <ToggleButton value="적음">적은 편이에요</ToggleButton>
            <ToggleButton value="보통">보통이에요</ToggleButton>
            <ToggleButton value="많음">많아요</ToggleButton>
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
            <ToggleButton value="7">안 했어요</ToggleButton>
            <ToggleButton value="14">하긴 했어요</ToggleButton>
            <ToggleButton value="21">다 했어요</ToggleButton>
          </ToggleButtonGroup>
          <div className={styles.boxmargin}>
            <div className={`${styles.margin && styles.flex}`}>
              <span className={styles.inlinetext}>총 평점</span>
              <Rating
                size="large"
                className={styles.margin}
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
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
            />
            <MyFormHelperText />
          </div>
          <div className={styles.submit}>
            <Button variant="outlined">취소</Button>
            <Button variant="contained">제출</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
