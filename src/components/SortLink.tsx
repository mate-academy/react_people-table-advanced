import cn from 'classnames';
import { FC, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

interface Props {
  field: keyof Person
}

export const SortLink: FC<Props> = memo(({ field }) => {
  const [searchParams] = useSearchParams();

  const isCurrent = searchParams.get('sortBy') === field;
  const isDesc = searchParams.get('sortOrder') === 'desc';

  return (
    <SearchLink
      params={{
        sortBy: field,
        sortOrder: isCurrent
          && !isDesc ? 'desc' : 'asc',
      }}
    >
      <span className="icon">
        <i
          className={cn(
            'fas fa-sort',
            {
              'fa-sort-down': isCurrent,
              'fa-sort-up': isCurrent && isDesc,
            },
          )}
        />
      </span>
    </SearchLink>
  );
});
