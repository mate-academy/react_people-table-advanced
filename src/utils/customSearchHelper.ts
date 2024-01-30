export const customSearchHelper = (currentSearchParams, newParams) => {
  const updatedParams = new URLSearchParams(currentSearchParams);

  Object.entries(newParams).forEach(([key, value]) => {
    updatedParams.set(key, value);
  });

  return `?${updatedParams.toString()}`;
};

export const getSearch = (params, serch?) => {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach((item) => newParams.append(key, item.toString()))
    } else {
      newParams.set(key, value.toString())
    }
  }

};
