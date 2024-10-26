import { FC, Fragment, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  searchQuery: string;
}
const AutoCompleteInput: FC<Props> = ({ title, searchQuery, ...rest }) => {
  return (
    <Fragment>
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
      </div>
    </Fragment>
  );
};

export default AutoCompleteInput;
