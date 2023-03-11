import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import DehazeIcon from "@mui/icons-material/Dehaze";

interface intraId{
  intraId:String;
}

interface subject{
  id: Number;
  circle: Number;
  sbj_name: String;
}

export default function Menu({intraId}:intraId) {
  const [search, setSearch] =useState<string>('');
  const [subject, setSubject] = useState<subject[]>([]);
  const [searchResult,setSearchResult] = useState<subject[]>([]);
  const [focus, setFocus] = useState(false);

  const onClickSearch = () => {
    const tmp_sbj = subject.filter((sbj)=>
    {
      const tmp = sbj.sbj_name.replace('_','');
      return tmp.toLowerCase().includes(search.toLowerCase())
    });
    setSearchResult(tmp_sbj);
  };

  useEffect(()=>{
    fetch(`http://localhost:3001/subjects`)
    .then((res)=>res.json())
    .then((data)=>setSubject(data));
    },[]);

  return (
    <div className={styles.background}>
      <div className={styles.flex_row}>
        <Link to="/" className={styles.logo}>
          <h2>42ence</h2>
        </Link>
        {/* <div className={styles.menu}>
          <Link to="/subjectList" className={styles.subject}>
            subject
          </Link>
          <Link to="/" className={styles.subject}>
            like42ence
          </Link>
        </div> */}
        <div className={styles.flex_interface}>
          <form className={styles.dropdown}>
            <input
              type="text"
              placeholder="과제 검색하기"
              className={styles.form}
              onFocus={()=>setFocus(true)}
              onChange={(e) => {
                setSearch(e.target.value.replaceAll(' ','').replaceAll('_',''));
                onClickSearch();
              }}
            />
            {focus && search !== '' && <div className={styles.dropdown_content}>
              <ul>
                {
                  searchResult.map((data, idx)=><Link key={idx} onClick={()=>setFocus(false)} to={`/${data.circle}_circle/${data.sbj_name}`}>{data.sbj_name}</Link>)
                }
              </ul>
            </div>}
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
