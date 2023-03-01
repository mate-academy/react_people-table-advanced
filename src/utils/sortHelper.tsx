export const getSortParams = (
  currentSearchParams: URLSearchParams,
  sort: string,
) => {
  const currentSort = currentSearchParams.get('sort');
  const currentOrder = currentSearchParams.get('order');
  const paramsToSet: { [key:string]:string | null } = {};

  if ((currentSort === sort) && (currentOrder)) {
    paramsToSet.sort = null;
    paramsToSet.order = null;
  }

  if ((currentSort === sort) && (!currentOrder)) {
    paramsToSet.order = 'desc';
  }

  if (currentSort !== sort) {
    paramsToSet.sort = sort;
    paramsToSet.order = null;
  }

  return paramsToSet;
};
