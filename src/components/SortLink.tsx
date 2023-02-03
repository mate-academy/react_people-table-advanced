import cn from 'classnames';
import { FC, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

interface Props {
  parametrValue: string
}

export const SortLink: FC<Props> = memo(({ parametrValue }) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  return (
    <SearchLink params={{
      sort: (sortBy === parametrValue && order === 'desc')
        ? null
        : parametrValue,
      order: (sortBy === parametrValue && order !== 'desc')
        ? 'desc'
        : null,
    }}
    >
      <span className="icon">
        <i
          className={cn(
            'fas',
            { 'fa-sort': sortBy !== parametrValue || order !== 'desc' },
            { 'fa-sort-up': sortBy === parametrValue && order !== 'desc' },
            { 'fa-sort-down': sortBy === parametrValue && order === 'desc' },
          )}
        />
      </span>
    </SearchLink>
  );
});
