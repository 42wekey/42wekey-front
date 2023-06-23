import { useState } from "react";
import { instance } from "../../utils/axios";
import { Navigate, useNavigate } from "react-router";
import styles from "./Admin.module.css";

export default function AdminCreate() {
  const [name, setName] = useState("");
  const [circle, setCircle] = useState("");
  const [info, setInfo] = useState("");
  const [des, setDes] = useState("");
  const navigate = useNavigate();


  const onClick = async () => {
    try{
      await instance.post(`/admin/subjects/create`,{
        "subject_name": name,
        "circle": Number(circle),
        "subject_info": info,
        "description": des,
      })
      .then(function(response){
        if (response.status)
          {
            alert("추가되었습니다.");
            document.body.style.overflow = "unset";
            navigate("/admin");
          }
      })
    }
    catch {
      console.log ("error");
    }
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
