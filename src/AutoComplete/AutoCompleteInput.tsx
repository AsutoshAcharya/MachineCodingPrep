import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import SearchListItem from "./SearchListItem";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  defaultData: Array<string>;
  searchQuery: string;
  dataToRender: Array<string>;
  loading: boolean;
}
const AutoCompleteInput: FC<Props> = ({
  title,
  defaultData,
  searchQuery,
  dataToRender,
  loading,
  ...rest
}) => {
  const [selectedItem, setSelectedItem] = useState("");
  console.log(dataToRender);
  console.log(selectedItem);
  useEffect(() => {
    if (!loading) {
      setSelectedItem(dataToRender?.at(0) || "");
    }
  }, [loading, dataToRender]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" && dataToRender.length > 0) {
        setSelectedItem((prev: string) => {
          const currIndex = dataToRender?.indexOf(prev);
          //   console.log(currIndex);
          if (currIndex === dataToRender?.length - 1) {
            return dataToRender[0];
          }
          return dataToRender[dataToRender?.indexOf(prev) + 1];
        });
      }
      if (e.key === "ArrowUp" && dataToRender.length > 0) {
      }
    });
  }, [dataToRender]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h1>{title}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <input
          type="text"
          value={searchQuery}
          onFocus={(e) => {
            e.currentTarget.style.outline = "2px solid blue";
            e.currentTarget.style.border = "none";
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = "2px solid grey";
          }}
          style={{
            width: "100%",
            borderRadius: "5px",
            height: "40px",
            border: "2px solid grey",
          }}
          {...rest}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "95%",
            height: "300px",
            boxShadow: "0px 0px 5px 1px black",
            borderRadius: "5px",
            overflow: "auto",
            padding: "10px",
          }}
        >
          {dataToRender
            // .concat(defaultData)
            // .concat(defaultData)
            // .concat(defaultData)
            ?.map((item) => (
              <SearchListItem
                key={item}
                style={{
                  width: "100%",
                  textAlign: "center",
                  height: "40px",
                  background: selectedItem === item ? "grey" : "white",
                  cursor: "pointer",
                  flexShrink: 0,
                  borderRadius: "5px",
                  //   color: selectedItem === item ? "white" : "black",
                }}
                item={item}
                searchQuery={searchQuery}
              />
            ))}
          {loading && (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#db486d",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#FFF",
              }}
            >
              Loading...
            </div>
          )}
          {dataToRender?.length === 0 && !loading && <div>No Recipe Found</div>}
        </div>
      </div>
    </div>
  );
};

export default AutoCompleteInput;
