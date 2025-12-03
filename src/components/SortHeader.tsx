import { useSearchParams } from 'react-router-dom';
import { SortableField } from '../types/SortableFields';
import classNames from 'classnames';

type Props = {
  field: SortableField;
  label: string;
};

export const SortHeader: React.FC<Props> = ({ field, label }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const isActive = currentSort === field;
  const isDesc = isActive && currentOrder === 'desc';

  const handleClick = () => {
    if (!isActive) {
      searchParams.set('sort', field);
      searchParams.delete('order');
    } else if (!isDesc) {
      searchParams.set('sort', field);
      searchParams.set('order', 'desc');
    } else {
      searchParams.delete('sort');
      searchParams.delete('order');
    }

    setSearchParams(searchParams);
  };

  return (
    <span
      className="is-flex is-flex-wrap-nowrap"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {label}
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': !isActive,
            'fa-sort-up': isActive && !isDesc,
            'fa-sort-down': isDesc,
          })}
        />
      </span>
    </span>
  );
};
