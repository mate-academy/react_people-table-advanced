export const getSortParams = (
  sort: string | null,
  order: string | null,
  field: string,
) => {
  if (sort !== field) {
    return {
      sort: field,
      order: null,
    };
  }

  if (order !== 'desc') {
    return {
      sort: field,
      order: 'desc',
    };
  }

  return {
    sort: null,
    order: null,
  };
};

export const getSortIcon = (
  sort: string | null,
  order: string | null,
  field: string,
) => {
  if (sort !== field) {
    return 'fas fa-sort';
  }

  if (order === 'desc') {
    return 'fas fa-sort-down';
  }

  return 'fas fa-sort-up';
};
