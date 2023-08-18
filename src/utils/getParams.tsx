export const getParams = (
  sort: string,
  order: string,
  linkName: string,
) => {
  return {
    sort: order && sort === linkName ? null : linkName,
    order: sort === linkName && !order ? 'desc' : null,
  };
};
