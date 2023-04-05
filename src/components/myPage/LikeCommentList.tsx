import { useEffect, useState } from "react";

export default function LikeCommentList() {
  const [likeComment, setLikeComment] = useState();
  
  useEffect(() => {
    fetch(`http://localhost:3001/wiki`)
      .then((res) => res.json())
      .then((data) => setLikeComment(data));
  }, []);
  return (<div>{likeComment}</div>);
}
