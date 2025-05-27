export const getSaveSearchParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string,
) => {
  const newParams = new URLSearchParams(searchParams);
  const values = newParams.getAll(key);

  const isIncluded = values.includes(value);

  newParams.delete(key);
  const updatedValues = isIncluded
    ? values.filter(v => v !== value)
    : [...values, value];

  updatedValues.forEach(v => newParams.append(key, v));

  return newParams;
};

export const searchQueryParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string,
) => {
  const allValue = searchParams.getAll(key);

  return allValue.some(v => v === value);
};

export const searchParamsSetSex = (
  searchParams: URLSearchParams,
  key: string,
  value: string,
) => {
  const newSearchParams = new URLSearchParams(searchParams);

  newSearchParams.set(key, value);

  return `${newSearchParams}`;
};
