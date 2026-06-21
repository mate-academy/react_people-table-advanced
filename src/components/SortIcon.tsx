import cn from 'classnames';

type Props = {
  sortField: 'name' | 'sex' | 'born' | 'died';
  currentSort: string;
  currentOrder: string;
};

export const SortIcon: React.FC<Props> = ({
  sortField,
  currentSort,
  currentOrder,
}) => {
  const isSorted = currentSort === sortField;
  const isDesc = isSorted && currentOrder === 'desc';

  return (
    <span className="icon">
      <i
        className={cn('fas', {
          'fa-sort': !isSorted,
          'fa-sort-up': isSorted && !isDesc,
          'fa-sort-down': isSorted && isDesc,
        })}
      />
    </span>
  );
};
