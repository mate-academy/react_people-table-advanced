import { FC } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';
import { SortType } from '../../types/SortType';

interface Props {
  sortField: SortType,
}

export const SortLink: FC<Props> = ({ sortField }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';
  const isSelected = sortBy === sortField;

  return (
    <SearchLink params={{
      sort: isSelected && isReversed
        ? null
        : sortField,

      order: isSelected && !isReversed
        ? 'desc'
        : null,
    }}
    >
      <span className="icon">
        <i className={cn('fas', {
          'fa-sort': !isSelected,
          'fa-sort-up': isSelected && !isReversed,
          'fa-sort-down': isSelected && isReversed,
        })}
        />
      </span>
    </SearchLink>
  );
};
