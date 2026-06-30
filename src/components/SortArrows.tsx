import cn from 'classnames';

export const SortIcon = ({
  columnName,
  currentSort,
  currentOrder,
}: {
  columnName: string;
  currentSort: string | null;
  currentOrder: string | null;
}) => {
  if (columnName === 'Mother' || columnName === 'Father') {
    return null;
  }

  const normalized = columnName.toLowerCase();

  return (
    <span className="icon">
      <i
        className={cn('fas', {
          'fa-sort': currentSort !== normalized,
          'fa-sort-up': currentOrder !== 'desc' && currentSort === normalized,
          'fa-sort-down': currentOrder === 'desc' && currentSort === normalized,
        })}
      />
    </span>
  );
};
