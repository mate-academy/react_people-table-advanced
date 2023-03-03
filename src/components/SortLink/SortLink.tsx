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
    const noSorted = sortedBy !== columnName;
    const sortedAsc = sortedBy === columnName && !ordered;
    const sortedDesc = sortedBy === columnName && ordered;

    return cn('fas', {
      'fa-sort': noSorted,
      'fa-sort-up': sortedAsc,
      'fa-sort-down': sortedDesc,
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
