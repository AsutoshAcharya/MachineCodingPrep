import { useEffect, useState } from "react";

const ProgressBar = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (width === 100) return;
    const interval = setInterval(() => {
      setWidth((prev) => prev + 1);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [width, setWidth]);
  return (
    <div className="container">
      <div className="outer-box">
        <div
          className="inner-box"
          style={{
            width: `${width}%`,
            height: "100%",
            background: "#06d66b",
            borderRadius: "5px",
          }}
        ></div>
        <p
          style={{
            position: "absolute",
            left: "45%",
            bottom: "-15px",
            color: width > 45 ? "white" : "black",
          }}
        >
          {width + "%"}
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
