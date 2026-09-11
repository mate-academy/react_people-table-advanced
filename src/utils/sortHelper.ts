type SortParams = {
  sort: string | null;
  order: string | null;
};

export function getNextSortParams(
  field: string,
  sort: string | null,
  order: string | null,
): SortParams {
  if (sort !== field) {
    return { sort: field, order: null };
  }

  if (!order) {
    return { sort: field, order: 'desc' };
  }

  return { sort: null, order: null };
}

export function getSortIconClass(
  field: string,
  sort: string | null,
  order: string | null,
): string {
  if (sort !== field) {
    return 'fa-sort';
  }

  return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
}
