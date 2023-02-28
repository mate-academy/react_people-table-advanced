import { FC, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';

type Props = {
  currentColumnName: string;
};

export const SortLink: FC<Props> = memo(({ currentColumnName }) => {
  const [searchParams] = useSearchParams();
  const sortedBy = searchParams.get('sort');
  const ordered = searchParams.get('order');

  const changeSortMethod = (method: string) => {
    if (sortedBy !== method) {
      return {
        sort: method,
        order: null,
      };
    }

    if (ordered) {
      return {
        sort: null,
        order: null,
      };
    }

    return {
      sort: method,
      order: 'desc',
    };
  };

  const changeSortingIcon = (columnName: string) => {
    return cn('fas', {
      'fa-sort': sortedBy !== columnName,
      'fa-sort-up': sortedBy === columnName && !ordered,
      'fa-sort-down': sortedBy === columnName && ordered,
    });
  };

  return (
    <SearchLink params={changeSortMethod(currentColumnName)}>
      <span className="icon">
        <i className={changeSortingIcon(currentColumnName)} />
      </span>
    </SearchLink>
  );
});
