import cn from 'classnames';
import { useSortParams } from '../../utils';

type Props = {
  column: string;
};

export const SortIcon: React.FC<Props> = ({ column }) => {
  const { sortParam, orderParam } = useSortParams();

  return (
    <span className="icon">
      <i
        className={cn('fas', {
          'fa-sort': sortParam !== column,
          'fa-sort-up': sortParam === column && !orderParam,
          'fa-sort-down': sortParam === column && orderParam,
        })}
      />
    </span>
  );
};
