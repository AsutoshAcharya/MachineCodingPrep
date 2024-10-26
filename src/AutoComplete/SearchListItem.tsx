import { FC, HTMLAttributes } from "react";
interface Props extends HTMLAttributes<HTMLDivElement> {
  item: string;
  searchQuery: string;
}
const SearchListItem: FC<Props> = ({ item, searchQuery, ...rest }) => {
  return <div {...rest}>{item}</div>;
};

export default SearchListItem;
