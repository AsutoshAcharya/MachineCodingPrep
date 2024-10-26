import { FC, useEffect, useState } from "react";
import SearchListItem from "./SearchListItem";
interface Props {
  dataToRender: Array<string>;
  searchQuery: string;
  loading: boolean;
}
const SuggetionList: FC<Props> = ({ dataToRender, searchQuery, loading }) => {
  const [selectedItem, setSelectedItem] = useState("");
  console.log(dataToRender);
  console.log(selectedItem);
  useEffect(() => {
    if (!loading) {
      setSelectedItem(dataToRender?.at(0) || "");
    }
  }, [loading, dataToRender]);

  useEffect(() => {
    function handleButtonSwitch(e: KeyboardEvent) {
      if (loading) return;
      if (e.key === "ArrowDown" && dataToRender.length > 0) {
        setSelectedItem((prev: string) => {
          const currIndex = dataToRender?.indexOf(prev);
          if (currIndex === dataToRender?.length - 1 || currIndex === -1) {
            return dataToRender[0];
          }
          return dataToRender[currIndex + 1];
        });
      }
      if (e.key === "ArrowUp" && dataToRender.length > 0) {
        setSelectedItem((prev: string) => {
          const currIndex = dataToRender?.indexOf(prev);
          if (currIndex === 0) {
            return dataToRender[dataToRender.length - 1];
          }
          if (currIndex <= dataToRender.length - 1) {
            return dataToRender[currIndex - 1];
          }
          return "";
        });
      }
    }
    window.addEventListener("keydown", handleButtonSwitch);
    return () => {
      window.removeEventListener("keydown", handleButtonSwitch);
    };
  }, [dataToRender, loading]);
  return (
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
      {dataToRender?.map((item) => (
        <SearchListItem
          key={item}
          style={{
            width: "100%",
            textAlign: "center",
            height: "40px",
            background: selectedItem === item ? "#99c4ab" : "white",
            cursor: "pointer",
            flexShrink: 0,
            borderRadius: "5px",
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
  );
};

export default SuggetionList;
