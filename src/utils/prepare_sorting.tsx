

export const handleSortClick = (column: string , currentSort : string | null , currentOrder : string | null) => {
  if (currentSort !== column) {
    return { sort: column};
  }

  if (currentOrder === '') {
    return { sort: column, order: 'desc' };
  }

  return {sort: null , order: null};
};

export const getSortIcon = (field) => {
  const sort = field['sort']
  const order = field['order']

  if (sort && !order){
    return <i className="fas fa-sort" />;
  }

  return order === 'desc' ? (
    <i className="fas fa-sort-up" />
  ) : (
    <i className="fas fa-sort-down" />
  );
};

