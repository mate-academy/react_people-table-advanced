export const handleSort = (field: string, searchParams: URLSearchParams) => {
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  if (!sort) {
    return { sort: field, order: null };
  }

  if (sort === field) {
    return order ? { sort: null, order: null } : { sort: field, order: 'desc' };
  }

  return { sort: field, order: null };
};