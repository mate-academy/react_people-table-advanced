export const getParams = (
  sort: string | null,
  order: string | null,
  linkName: string,
) => {
  return {
    sort: order && sort === linkName ? null : linkName,
    order: sort === linkName && !order ? 'desc' : null,
  };
};
