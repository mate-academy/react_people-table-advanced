import { FC } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';
import { DESC } from '../../constants';
import { SearchLink } from '../SearchLink';

type Props = {
  field: string;
};

export const SortBtn: FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortParams = searchParams.get(SearchParams.Sort) || '';
  const orederParams = searchParams.get(SearchParams.Order) === DESC;

  const params = {
    sort: (field === sortParams && orederParams) ? null : field,
    order: (field === sortParams && !orederParams) ? DESC : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={cn('fas', {
            'fa-sort': sortParams !== field,
            'fa-sort-up': sortParams === field && !orederParams,
            'fa-sort-down': sortParams === field && orederParams,
          })}
        />
      </span>
    </SearchLink>
  );
};
