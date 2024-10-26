import { useEffect, useState } from "react";

function useDebounce<T>(data: T, timeout: number) {
  const [value, setValue] = useState(data);
  useEffect(() => {
    const fn = setTimeout(() => {
      setValue(data);
    }, timeout);
    return () => {
      clearTimeout(fn);
    };
  }, [data, timeout]);
  return value;
}

export default useDebounce;
