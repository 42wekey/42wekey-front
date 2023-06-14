import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";

interface sbj {
  id: number;
  subject_name: string;
  circle: number;
  subject_info: string;
  description: string;
}

export default function AdminList() {
  const baseUrl = `${process.env.REACT_APP_END_POINT}`;
  const [sbj, setSbj] = useState<sbj[]>([]);

  useEffect(() => {
    fetch(`${baseUrl}/admin/subject`)
      .then((res) => res.json())
      .then((data) => setSbj(data));
  }, [sbj]);

  return (
    <div>
      {sbj.map((data, index) => (
        <div
          key={index}
          style={{
            margin: "5px",
            border: "1px solid black",
            borderRadius: "5px",
            width: "500px",
            padding: "5px",
          }}
        >
          <div>
            <span
              style={{ fontWeight: "700", marginRight: "5px" }}
            >{`${data.circle}  `}</span>
            <span>{`${data.subject_name}  `}</span>
            <span> | </span>
            <span>{`${data.subject_info}  `}</span>
          </div>
          <div>
            <span>{`${data.description}  `}</span>
          </div>
          <button
            className={styles.btnWarning}
            onClick={() => {
              const confirmed = window.confirm("저어엉말 삭제하시겠습니까?");
              if (confirmed) {
                fetch(`${baseUrl}/subjects/${data.id}`, {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                });
              }
            }}
          >
            삭제하기
          </button>
          <Link to={`/admin/${data.id}`}>
            <button className={styles.btn}>수정하기</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
