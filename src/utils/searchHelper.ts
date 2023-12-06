type Params = {
  [key: string]: string[] | string | null;
};

export const getSearchWith
= (params: Params, search?: string | URLSearchParams) => {
  const newParams = new URLSearchParams(search);

  Object.entries(params)
    .forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach(item => newParams.append(key, item));
      } else {
        newParams.set(key, value);
      }
    });

  return newParams.toString();
};
