export function handleChangeSort(sortParam: string,
  sort: string | null,
  order: string | null) {
  const sorts: { [key: string]: string | null } = { sort, order };

  if (!sorts.sort) {
    sorts.sort = sortParam;

    return sorts;
  }

  if (!sorts.order && sorts.sort && sorts.sort === sortParam) {
    sorts.order = 'desc';

    return sorts;
  }

  if (!sorts.order && sorts.sort && sorts.sort !== sortParam) {
    sorts.sort = sortParam;

    return sorts;
  }

  if (sorts.order && sorts.sort && sorts.sort === sortParam) {
    sorts.sort = null;
    sorts.order = null;

    return sorts;
  }

  if (sorts.order && sorts.sort && sorts.sort !== sortParam) {
    sorts.sort = sortParam;
    sorts.order = null;
  }

  return sorts;
}
