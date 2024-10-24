import { useMemo, useState } from "react";
const items = Array.from({ length: 10000 }, (_d, idx) => idx + 1);
const containerHeight = 450;
const itemHeight = 40;
const VirtualizedList = () => {
  const [index, setIndex] = useState([
    0,
    Math.floor(containerHeight / itemHeight),
  ]);

  const itemToRender = useMemo(
    () => items.slice(index[0], index[1] + 1),
    [index[0], index[1]]
  );
  //   console.log(itemToRender);
  return (
    <div className="container">
      <div
        className="list-box"
        style={{
          height: containerHeight,
          width: "300px",
          background: "grey",
          marginTop: "auto",
          marginBottom: "auto",
          overflow: "auto",
        }}
        onScroll={(e) => {
          const { scrollTop } = e.currentTarget;
          //5px gap
          const changedInitialIndex = Math.floor(scrollTop / itemHeight);
          console.log(changedInitialIndex);
          setIndex([
            changedInitialIndex,
            changedInitialIndex + Math.floor(containerHeight / itemHeight),
          ]);
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: items.length * itemHeight,
            position: "relative",
          }}
        >
          {itemToRender.map((item, idx) => (
            <div
              key={item}
              style={{
                width: "100%",
                background: "olive",
                height: itemHeight,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFF",
                position: "absolute",
                borderTop: "5px solid gray",
                top: (index[0] + idx) * itemHeight,
              }}
            >
              Item-{item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList;
