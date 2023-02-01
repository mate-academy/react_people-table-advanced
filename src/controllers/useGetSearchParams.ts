export type VisiblePeopleParams = {
  sex: string | null,
  query: string,
  centuries: string[],
  sort: string | null,
  order: string | null,
};

export const useGetSearchParams = (
  searchParams: URLSearchParams,
): VisiblePeopleParams => {
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return {
    sex,
    query,
    centuries,
    sort,
    order,
  };
};
