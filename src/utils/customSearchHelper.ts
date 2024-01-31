// This is my simple helper function
// export const customSearchHelper = (currentSearchParams, newParams) => {
//   const updatedParams = new URLSearchParams(currentSearchParams);

//   Object.entries(newParams).forEach(([key, value]) => {
//     updatedParams.set(key, value);
//   });

//   return `?${updatedParams.toString()}`;
// };

// this is extended helper function with some bugs
export const getSearch = (params, search?) => {
  const newParams = new URLSearchParams(search);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      const existingValues = newParams.getAll(key);
      newParams.delete(key);
      newParams.append(key, ...existingValues, ...value.map(String));
    } else {
      newParams.set(key, value.toString());
    }
  });

  return newParams.toString();
};
