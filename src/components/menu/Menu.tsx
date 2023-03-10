import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useEffect, useState } from "react";

interface intraId {
  intraId: String;
}

interface subject {
  id: number;
  circle: number;
  sbj_name: string;
}

export default function Menu({ intraId }: intraId) {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState<subject[]>([]);
  useEffect(() => {
    fetch(`http://localhost:3001/subjects`)
      .then((res) => res.json())
      .then((data) => setSubject(data));
  }, []);

  const filterTitle = subject.filter((p) => {
    return p.sbj_name
      .replace(" ", "")
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase().replace(" ", ""));
  });
  console.log(filterTitle);

  return (
    <div className={styles.background}>
      <div className={styles.flex_row}>
        <Link to="/" className={styles.logo}>
          <h2>42ence</h2>
        </Link>
        <div className={styles.flex_interface}>
          <form>
            <input
              type="text"
              placeholder="과제 검색하기"
              onChange={(e) => setSearch(e.target.value)}
              className={styles.form}
            />
          </form>
          <div>
            <div className={styles.dropdown}>
              <button className={styles.dropbtn}>
                <span className={styles.dropbtn_icon}></span>
                {intraId}
                <DehazeIcon />
              </button>
              <div className={styles.dropdown_content}>
                <Link to={`/allComment/${intraId}`}>내가 쓴 댓글</Link>
                <Link to="#">로그아웃</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
