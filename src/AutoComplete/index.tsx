import { useEffect, useState } from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import useDebounce from "../hooks/useDebounce";
import useCache from "../hooks/useCache";
import SuggetionList from "./SuggetionList";
//https://dummyjson.com/recipes/search?q&limit=5
const defaultData = ["apple", "banana", "cherry"];

const AutoComplete = () => {
  const [searchQuery, setSearchQuery] = useState(""); //to set the input search data
  const debouncedSearch = useDebounce(searchQuery, 1000); // for api call
  const [loading, setLoading] = useState(false);
  const { cache, updateCache } = useCache(debouncedSearch);
  console.log(cache);
  console.log(debouncedSearch);

  async function fetchSuggetions() {
    if (Object.keys(cache).includes(debouncedSearch)) return;
    setLoading(true);
    await fetch(
      `https://dummyjson.com/recipes/search?q=${debouncedSearch}&limit=10`
    )
      .then((resp) => resp.json())
      .then((result) => {
        const { recipes } = result;
        if (recipes?.length === 0) return;
        console.log(recipes);
        const recipeNames = recipes?.map((r: any) => r?.name);
        console.log(recipeNames);
        updateCache(recipeNames);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (debouncedSearch === "") return;
    fetchSuggetions();
  }, [debouncedSearch]);
  return (
    <div className="container">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <AutoCompleteInput
          title="AutoComplete/TypeHeads"
          searchQuery={searchQuery}
          placeholder="Search Recipe"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SuggetionList
          dataToRender={cache[searchQuery] || []}
          loading={loading}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default AutoComplete;
