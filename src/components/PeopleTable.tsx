const toggleSort = (field: SortField) => {
  const params = new URLSearchParams(searchParams);
  const currentSort = params.get('sort');
  const currentOrder = params.get('order');

  if (currentSort !== field) {
    params.set('sort', field);
    params.delete('order');
  } else if (!currentOrder) {
    params.set('order', 'desc');
  } else {
    params.delete('sort');
    params.delete('order');
  }

  setSearchParams(params);
};
