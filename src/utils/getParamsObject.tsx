export const getParamsObject = (
  sort: string | null,
  order: string | null,
  sortBy: string,
) => {
  if (sort !== sortBy) {
    return { sort: sortBy, order: null };
  }

  if (order !== 'desc') {
    return { sort: sortBy, order: 'desc' };
  }

  return { sort: null, order: null };
};
