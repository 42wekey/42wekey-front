import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./Admin.module.css";

interface subject {
  id: string;
  subject_name: string;
  circle: number;
  subject_info: string;
  description: string;
}

export default function AdminEdit() {
  const baseUrl = `${process.env.REACT_APP_END_POINT}`;
  const [name, setName] = useState("");
  const [circle, setCircle] = useState("");
  const [info, setInfo] = useState("");
  const [des, setDes] = useState("");
  const param = useParams() as { sbj_name: string };
  const id = param.sbj_name;

  useEffect(() => {
    fetch(`${baseUrl}/subjects/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.subject_name);
        setCircle(data.circle);
        setInfo(data.subject_info);
        setDes(data.description);
      });
  }, []);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    fetch(`${baseUrl}/subjects/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject_name: name,
        circle: Number(circle),
        subject_info: info,
        description: des,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("수정되었습니다.");
        document.body.style.overflow = "unset";
      }
    });
  };

  return (
    <div>
      과제명
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      서클
      <input
        type="text"
        value={circle}
        onChange={(e) => {
          setCircle(e.target.value);
        }}
        placeholder="숫자로 입력해주세요 ex)1"
      />
      <br />
      한줄평
      <input
        type="text"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
      />
      <br />
      과제설명
      <input type="text" value={des} onChange={(e) => setDes(e.target.value)} />
      <br />
      <button className={styles.btn} onClick={onClick}>
        전송
      </button>
    </div>
  );
}
