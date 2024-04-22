export const checkSorts = (order: string, sort: string, field: string) => {
  if (order && sort !== field) {
    return { sort: field, order: null };
  }

  if (!order && sort) {
    return { sort: field, order: 'desc' };
  }

  if (sort && order) {
    return { sort: null, order: null };
  }

  return { sort: field, order: null };
};
