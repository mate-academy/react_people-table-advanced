import { useSearchParams } from "react-router-dom";
import { getSearchWith } from "../../utils/searchHelper";

export function useSetSearchWith() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchWith = (params: any) => {
    const search = getSearchWith(params, searchParams);
    setSearchParams(search);
  }

  return setSearchWith;
};