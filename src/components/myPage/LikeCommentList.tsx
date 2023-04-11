import { useEffect, useState } from "react";

const baseUrl = `${process.env.REACT_APP_END_POINT}`;

export default function LikeCommentList() {
  const [likeComment, setLikeComment] = useState();
  
  useEffect(() => {
    fetch(`${baseUrl}/wiki`)
      .then((res) => res.json())
      .then((data) => setLikeComment(data));
  }, []);
  return (<div>{likeComment}</div>);
}
