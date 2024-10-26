import { useState } from "react";

const useCache = (searchedQuery: string) => {
  const [cache, setCache] = useState<Record<string, string[]>>({});
  function updateCache(data: Array<string>) {
    if (!Object.keys(cache).includes(searchedQuery)) {
      setCache({ ...cache, [searchedQuery]: data });
    }
  }
  return { cache, updateCache };
};

export default useCache;
