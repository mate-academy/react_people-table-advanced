import { useSearchParams } from 'react-router-dom';

export const useSortParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams);
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order') || 'asc';

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order'); // start with asc (default)
    } else if (currentOrder === 'asc' || !searchParams.has('order')) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const renderSortIcon = (field: string) => (
    <a className="icon">
      {sortBy !== field && <i className="fas fa-sort" />}
      {sortBy === field && sortOrder === 'asc' && (
        <i className="fas fa-sort-up" />
      )}
      {sortBy === field && sortOrder === 'desc' && (
        <i className="fas fa-sort-down" />
      )}
    </a>
  );

  return { sortBy, sortOrder, handleSort, renderSortIcon };
};
