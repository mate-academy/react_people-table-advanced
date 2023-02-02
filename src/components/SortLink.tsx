import cn from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

interface Props {
  parametrValue: string
}

export const SortLink: FC<Props> = ({ parametrValue }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  return (
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
  );
};
