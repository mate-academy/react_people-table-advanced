const getNextOrder = (currentOrder: string): string => {
  if (currentOrder === 'asc') {
    return 'desc';
  }

  if (currentOrder === 'desc') {
    return '';
  }

  return 'asc';
};

export const getSortIcon = (
  currentSort: string,
  currentOrder: string,
  column: string,
): string => {
  if (currentSort === column) {
    if (currentOrder === 'asc') {
      return 'fas fa-sort-up';
    }

    if (currentOrder === 'desc') {
      return 'fas fa-sort-down';
    }
  }

  return 'fas fa-sort';
};

export const getSortLink = (
  searchParams: URLSearchParams,
  column: string,
): string => {
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order') || 'asc';
  const nextOrder = getNextOrder(currentOrder);
  const params = new URLSearchParams(searchParams.toString());

  if (currentSort !== column) {
    params.set('sort', column);
    params.delete('order');
  } else if (nextOrder === 'asc') {
    params.set('sort', column);
    params.delete('order');
  } else if (nextOrder === 'desc') {
    params.set('sort', column);
    params.set('order', 'desc');
  } else {
    params.delete('sort');
    params.delete('order');
  }

  return `?${params.toString()}`;
};
