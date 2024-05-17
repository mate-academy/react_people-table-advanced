export const getFilters = (searchParams: URLSearchParams) => {
  const centuries = searchParams.getAll('centuries') || [];
  const filterBySex = searchParams.get('sex') || '';
  const filterByQuery = searchParams.get('query') || '';

  return {
    filterBySex,
    filterByQuery,
    centuries,
  };
};
