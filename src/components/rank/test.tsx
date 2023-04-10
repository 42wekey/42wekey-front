import React, {
  useState,
  useEffect,
  useRef,
} from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const App = () => {
  const images = useRef([
    {
      src: "https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black",
    },
    {
      src: "https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=black",
    },
    {
      src: "https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white",
    },
  ]);
  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`,
  });
  const imgSize = useRef(images.current.length);

  const moveSlide = (i) => {
    let nextIndex = current + i;

    if (nextIndex < 0) nextIndex = imgSize.current - 1;
    else if (nextIndex >= imgSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  };

  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  return (
    <div className="container">
      <div className="slide">
        <div
          className="btn"
          onClick={() => {
            moveSlide(-1);
          }}
        >
          &lt;
        </div>
        <div className="window">
          <div className="flexbox" style={style}>
            {images.current.map((img, i) => (
              <div
                key={i}
                className="img"
                style={{ backgroundImage: `url(${img.src})` }}
              ></div>
            ))}
          </div>
        </div>
        <div
          className="btn"
          onClick={() => {
            moveSlide(1);
          }}
        >
          &gt;
        </div>
      </div>
      <div className="position">
        {images.current.map((x, i) => (
          <div key={i} className={i === current ? "dot current" : "dot"}></div>
        ))}
      </div>
    </div>
  );
};
