import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { AsyncHook } from "async_hooks";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { dividerClasses } from "@mui/material";

interface intraId {
  intraId: String;
}

interface subject {
  id: Number;
  circle: Number;
  sbj_name: String;
}

export default function Menu({ intraId }: intraId) {
  const [search, setSearch] = useState<string>("");
  const [subject, setSubject] = useState<subject[]>([]);
  const [searchResult, setSearchResult] = useState<subject[]>([]);
  const [focus, setFocus] = useState(false);

  const onClickSearch = () => {
    const tmp_sbj = subject.filter((sbj) => {
      const tmp = sbj.sbj_name.replace("_", "");
      return tmp.toLowerCase().includes(search.toLowerCase());
    });
    setSearchResult(tmp_sbj);
  };

  function onclick(str:String)
  {
    console.log(str)
  }

  const focusEvent = () => {};

  useEffect(() => {
    fetch(`http://localhost:3001/subjects`)
      .then((res) => res.json())
      .then((data) => setSubject(data));
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.flex_row}>
        <Link to="/" className={styles.logo}>
          <h2>42ence</h2>
        </Link>
        <div className={styles.flex_interface}>
          <form className={styles.dropdown}>
            <input
              type="text"
              placeholder="과제 검색하기"
              className={styles.form}
              onFocus={() => setFocus(!focus)}
              // onBlur={() => setFocus(!focus)}
              onChange={(e) => {
                setSearch(
                  e.target.value.replaceAll(" ", "").replaceAll("_", "")
                );
                onClickSearch();
              }}
            />
            {focus && search && (
              <div className={styles.dropdown_content}>
                <ul>
                  {searchResult.map((data, idx) => (
                    <li key={idx}>
                      <button onClick={()=>onclick(data.sbj_name)}>123</button>
                      <div>
                        <Link to={`/${data.circle}_circle/${data.sbj_name}`}>
                          <div>{data.sbj_name}</div>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
