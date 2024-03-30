export const getSearchParams = (searchParams: URLSearchParams) => ({
  sort: searchParams.get('sort') || '',
  order: searchParams.get('order') || '',
  sex: searchParams.get('sex') || '',
  query: searchParams.get('query') || '',
  centuries: searchParams.getAll('centuries') || [],
});
