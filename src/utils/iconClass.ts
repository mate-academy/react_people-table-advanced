export const iconClass = (
  field: string,
  sortField: string,
  isReversed: string,
) => {
  if (sortField === field) {
    if (isReversed) {
      return 'fa-sort-down';
    }

    return 'fa-sort-up';
  }

  return 'fa-sort';
};
