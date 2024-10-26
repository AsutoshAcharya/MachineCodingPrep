import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import SuggetionList from "./SuggetionList";
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
        <SuggetionList
          dataToRender={dataToRender}
          selectedItem={selectedItem}
          searchQuery={searchQuery}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AutoCompleteInput;
