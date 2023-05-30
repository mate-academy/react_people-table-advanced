export const filterByGender = (sexParam: string | null, sexProp: string) => {
  return !sexParam || (sexParam === sexProp);
};

export const filterByQuery = (
  queryParam: string | null,
  names: (string | null)[],
) => {
  return !queryParam
    || names.some(checkedName => {
      const lowerCaseName = checkedName?.toLowerCase();
      const lowerCaseQuery = queryParam.toLowerCase();

      return lowerCaseName && lowerCaseName.includes(lowerCaseQuery);
    });
};

// eslint-disable-next-line max-len
export const filterByCenturies = (centuriesParam: string[], bornProp: number) => {
  const bornCentury = Math.floor(bornProp / 100) + 1;

  return centuriesParam.length === 0
    || centuriesParam.includes(bornCentury.toString());
};
