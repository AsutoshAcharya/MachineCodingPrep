import { useEffect, useState } from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import useDebounce from "../hooks/useDebounce";
import useCache from "../hooks/useCache";
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
      });
  }

  useEffect(() => {
    if (debouncedSearch === "") return;
    fetchSuggetions();
  }, [debouncedSearch]);
  return (
    <div className="container">
      <AutoCompleteInput
        title="AutoComplete/TypeHeads"
        defaultData={defaultData}
        searchQuery={searchQuery}
        dataToRender={cache[searchQuery]}
        placeholder="Search Recipe"
        onChange={(e) => setSearchQuery(e.target.value)}
        loading={loading}
      />
    </div>
  );
};

export default AutoComplete;
