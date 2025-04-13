import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

const SortHeader: React.FC<{ field: keyof Person }> = ({ field }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortClick = () => {
    const updatedParams = new URLSearchParams(searchParams);
    const currentSort = updatedParams.get('sort');
    const currentOrder = updatedParams.get('order');

    if (currentSort === field && currentOrder === 'desc') {
      updatedParams.delete('sort');
      updatedParams.delete('order');
    } else if (currentSort === field) {
      updatedParams.set('order', 'desc');
    } else {
      updatedParams.set('sort', field);
      updatedParams.delete('order');
    }

    setSearchParams(updatedParams);
  };

  return (
    <th onClick={handleSortClick}>
      {field}{' '}
      {searchParams.get('sort') === field
        ? searchParams.get('order') === 'desc'
          ? '↓'
          : '↑'
        : ''}
    </th>
  );
};

export default SortHeader;
