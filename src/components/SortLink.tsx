import cn from 'classnames';
import { FC, memo } from 'react';
import { SearchLink } from './SearchLink';

interface Props {
  parametrValue: string
  sort: string
  order: string
}

export const SortLink: FC<Props> = memo(({ parametrValue, sort, order }) => (
  <SearchLink params={{
    sort: (sort === parametrValue && order === 'desc')
      ? null
      : parametrValue,
    order: (sort === parametrValue && order !== 'desc')
      ? 'desc'
      : null,
  }}
  >
    <span className="icon">
      <i
        className={cn(
          'fas',
          { 'fa-sort': sort !== parametrValue || order !== 'desc' },
          { 'fa-sort-up': sort === parametrValue && order !== 'desc' },
          { 'fa-sort-down': sort === parametrValue && order === 'desc' },
        )}
      />
    </span>
  </SearchLink>
));
