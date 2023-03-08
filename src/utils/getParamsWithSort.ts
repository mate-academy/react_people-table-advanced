export const getParamsWithSort = (
  sortField: string | null,
  preparedField: string,
  isReverse: boolean,
) => {
  if (sortField !== preparedField) {
    return {
      sort: preparedField,
      order: null,
    };
  }

  if (!isReverse) {
    return {
      sort: preparedField,
      order: 'desc',
    };
  }

  return {
    sort: null,
    order: null,
  };
};
