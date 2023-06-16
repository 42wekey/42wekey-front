import ReactQuill from "react-quill";
import "./SubjectWiki.module.css";
import "react-quill/dist/quill.snow.css";
import styles from "./SubjectWiki.module.css";
import { Button } from "@mui/material";
import dummy from "../../db/data.json";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { instance } from "../../utils/axios";
import { useRecoilState } from "recoil";
import { errorState } from "../../utils/recoil/error";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, "link"],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
        { background: [] },
      ],
      ["image", "video"],
      ["clean"],
    ],
  },
};

interface propType {
  setIsWikiEdit: React.Dispatch<React.SetStateAction<Boolean>>;
  content?: string;
  id?: number;
}

interface wiki {
  id?: number;
  content?: string;
}


export default function SubjectWiki(props: propType) {
  const [wiki, setWiki] = useState<wiki>();
  const params = useParams() as { circle: string; sbj_name: string }; //params  = {subject : sbj_name}
  const sbj: string = params.sbj_name;
  const [wikiContent, setWikiContent] = useState(props.content);
  const [error, setError] = useRecoilState(errorState);
  const navigate = useNavigate();

  const clickEditButton = async (text?: string, version?: number) => {
    try{
      await instance.post(`/subjects/${sbj}/wiki`,{
        content: text,
        id: version
      },)
      .then(function(response){
        if (response.status)
          {
            alert("수정이 완료되었습니다.");
            props.setIsWikiEdit(false);
          }
      })
    }
    catch {
      alert("수정에 실패하였습니다.\n수정 내용을 복사하시고 새로 고침 후 다시 시도 해주세요.");
    }
  };

  // const clickEditButton = (text?: string, version?: number) => {
  //   fetch(`${baseUrl}/subjects/${sbj}/wiki`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("42ence-token")}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ "content": text, "id": version }),
  //   })
  //   .then((res)=>props.setIsWikiEdit(false));
  // };

  const clickCancleButton = () => {
    props.setIsWikiEdit(false);
  };

  const getWikiContent = async () => {
    try {
      const res = await instance.get(`/subjects/${sbj}/wiki`);
      setWiki(res.data);
    } catch (e) {
      setError('123');
      navigate('/error');
    }
  };

  useEffect(() => {
    getWikiContent();
  }, []);

  useEffect(() => {
    if (wiki?.content) {
      setWikiContent(wiki.content);
    }
  }, [wiki]);

  return (
    <div>
      <div className={styles.wiki}>
        <div className={styles.wikiBox}>
          <ReactQuill
            modules={modules}
            className={styles.SubjectWiki}
            value={wikiContent}
            defaultValue={wikiContent}
            onChange={setWikiContent}
            theme="snow"
          />
        </div>
        <div className={styles.submit}>
          <button
            onClick={() => clickCancleButton()}
            className={styles.cancleBtn}
          >
            취소
          </button>
          <button
            onClick={() => clickEditButton(wikiContent, wiki?.id)}
            className={styles.submitBtn}
          >
            제출
          </button>
        </div>{" "}
      </div>
    </div>
  );
}
