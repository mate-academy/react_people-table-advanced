export const setSortParams = (
  sortQuery: string,
  sortParam: string | null,
  orderParam: string | null,
): { [key: string]: string | null } => {
  if (sortParam !== sortQuery) {
    return { sort: sortQuery, order: null };
  }

  if (sortParam && !orderParam) {
    return { order: 'desc' };
  }

  if (sortParam && orderParam) {
    return { sort: null, order: null };
  }

  return {};
};
