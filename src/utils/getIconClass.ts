export const getIconClass = (
  field: string,
  sortField: string,
  isReversed: string,
) => {
  if (sortField !== field) {
    return 'fa-sort';
  }

  if (isReversed) {
    return 'fa-sort-down';
  }

  return 'fa-sort-up';
};
