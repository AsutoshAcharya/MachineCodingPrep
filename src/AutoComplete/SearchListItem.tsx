import { FC, HTMLAttributes } from "react";
interface Props extends HTMLAttributes<HTMLDivElement> {
  item: string;
  searchQuery: string;
}
const SearchListItem: FC<Props> = ({ item, searchQuery, ...rest }) => {
  return (
    <div {...rest}>
      {item.split(new RegExp(`(${searchQuery})`, "gi")).map((i, idx) => (
        <span
          key={i + idx}
          {...(i.toLowerCase() === searchQuery.toLowerCase() && {
            style: { fontWeight: "bold", color: "blue" },
          })}
        >
          {i}
        </span>
      ))}
    </div>
  );
};

export default SearchListItem;
