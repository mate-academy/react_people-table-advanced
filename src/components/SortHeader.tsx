import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import './SortHeader.scss';

const SortHeader: React.FC<{ field: keyof Person; label: string }> = ({
  field,
  label,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortClick = () => {
    const updatedParams = new URLSearchParams(searchParams);
    const currentSort = updatedParams.get('sort');
    const currentOrder = updatedParams.get('order');

    if (currentSort === field) {
      if (currentOrder === 'desc') {
        // Third click: disable sorting by removing sort and order.
        updatedParams.delete('sort');
        updatedParams.delete('order');
      } else {
        // Second click: update to descending order.
        updatedParams.set('order', 'desc');
      }
    } else {
      // First click: set new sort field; leave order undefined for ascending sort.
      updatedParams.set('sort', field as string);
      updatedParams.delete('order');
    }

    setSearchParams(updatedParams);
  };

  // Determine the displayed arrow:
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  return (
    <th onClick={handleSortClick} className="sortable-header clickable">
      {label} {currentSort === field && !currentOrder && '↑'}
      {currentSort === field && currentOrder === 'desc' && '↓'}
    </th>
  );
};

export default SortHeader;
