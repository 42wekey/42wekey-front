import ReactQuill from "react-quill";
import "./SubjectWiki.module.css";
import "react-quill/dist/quill.snow.css";
import styles from "./SubjectWiki.module.css";
import { Button } from "@mui/material";
import dummy from "../../db/data.json";
import { useState } from "react";

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
  version?: number;
}

export default function SubjectWiki(props: propType) {
  const [wikiContent, setWikiContent] = useState(props.content);
  const clickEditButton = (text?: string, version?: number) => {
    console.log(document.documentElement.scrollHeight);
    fetch(`${baseUrl}/wiki`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wikiContent: text, version: version }),
    });
    props.setIsWikiEdit(false);
  };

  const clickCancleButton = () => {
    props.setIsWikiEdit(false);
  };
  return (
    <>
      <div className={styles.wiki}>
        <div className={styles.wikiBox}>
          <ReactQuill
            modules={modules}
            className={styles.SubjectWiki}
            defaultValue={props.content}
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
            onClick={() => clickEditButton(wikiContent, props.version)}
            className={styles.submitBtn}
          >
            제출
          </button>
        </div>{" "}
      </div>
    </>
  );
}
