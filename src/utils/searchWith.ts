type Params = {
  [key: string]: string,
};

export const getSearchWith = (
  params: Params,
  searchParams: URLSearchParams,
): string => {
  const copy = new URLSearchParams(searchParams.toString());

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(params)) {
    if (params[key]) {
      copy.set(key, params[key]);
    } else {
      copy.delete(key);
    }
  }

  return copy.toString();
};
