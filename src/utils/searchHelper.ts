type Param = string | number;
export type Params = {
  [key: string]: Param[] | Param | null;
};

export function getSearchWith(
  params: Params,
  searchParams?: string | URLSearchParams,
) {
  const newParams = new URLSearchParams(searchParams);

  Object.keys(params).forEach(key => {
    const value = params[key];

    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  });

  return newParams.toString();
}
