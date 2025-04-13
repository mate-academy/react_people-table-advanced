import { useSearchParams } from 'react-router-dom';
import './SortHeader.scss';

interface Props {
  field: string; // The field to sort by (e.g., "name", "born")
  label: string; // The label to display in the header
}

const SortHeader: React.FC<Props> = ({ field, label }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortClick = () => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');
    const updatedParams = new URLSearchParams(searchParams);

    if (currentSort === field && currentOrder === 'asc') {
      // If already sorted ascending, reverse the order to descending
      updatedParams.set('order', 'desc');
    } else if (currentSort === field && currentOrder === 'desc') {
      // If already sorted descending, disable sorting
      updatedParams.delete('sort');
      updatedParams.delete('order');
    } else {
      // Otherwise, sort ascending by the given field
      updatedParams.set('sort', field);
      updatedParams.set('order', 'asc');
    }

    // eslint-disable-next-line no-console
    console.log('Updated params:', updatedParams.toString());
    setSearchParams(updatedParams);
  };

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  return (
    <th onClick={handleSortClick} className="sortable-header clickable">
      {label}
      {currentSort === field && currentOrder === 'asc' && ' 🔼'}
      {currentSort === field && currentOrder === 'desc' && ' 🔽'}
    </th>
  );
};

export default SortHeader;
