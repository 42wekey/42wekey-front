import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IsLogged() {
	const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const href = url.href;
    if (!href) return;
    const accessToken = href.split("code=")[1];
    console.log(accessToken);
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: accessToken,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("로그인에 성공했습니다.");
        navigate("/");
      }
    });
  }, []);

  return <div></div>;
}
